import nltk
import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import random
from nltk.stem.snowball import SnowballStemmer
stemmer = SnowballStemmer("russian")

# import nltk
nltk.data.path.append("/www/chatbot/backend/nltk_data")
# nltk.download('punkt', download_dir="/www/chatbot/backend/nltk_data")
# nltk.download('punkt_tab', download_dir="/www/chatbot/backend/nltk_data")
# nltk.download('averaged_perceptron_tagger_eng', download_dir="/www/chatbot/backend/nltk_data")
# nltk.download('stopwords', download_dir="/www/chatbot/backend/nltk_data")
# nltk.download('wordnet', download_dir="/www/chatbot/backend/nltk_data")
# nltk.download('averaged_perceptron_tagger', download_dir="/www/chatbot/backend/nltk_data")

class SupportBotNLP:
    """
    NLP-модуль для чат-бота клиентской поддержки

    Основные функции:
    - Предварительная обработка текста
    - Извлечение ключевых слов
    - Определение намерения
    - Классификация запроса
    - Поиск ответа в базе знаний
    - Ранжирование ответов
    - Обработка неоднозначных запросов

    Атрибуты:
    - knowledge_base: DataFrame с базой знаний
    - intents: словарь с шаблонами намерений
    - categories: список категорий
    - vectorizer: TF-IDF векторизатор
    - lemmatizer: лемматизатор
    - stop_words: список стоп-слов
    - confidence_threshold: порог уверенности для ответа
    """

    def __init__(self, knowledge_base_path=None, intents_path=None):
        """
        Инициализация NLP-модуля

        Параметры:
        - knowledge_base_path: путь к файлу базы знаний (JSON)
        - intents_path: путь к файлу с намерениями (JSON)
        """
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('russian'))
        self.confidence_threshold = 0.7
        self.vectorizer = TfidfVectorizer(tokenizer=self.preprocess_text)

        # Загрузка базы знаний
        if knowledge_base_path:
            self.load_knowledge_base(knowledge_base_path)
        else:
            self.knowledge_base = pd.DataFrame(columns=['question', 'answer', 'category'])

        # Загрузка намерений
        if intents_path:
            self.load_intents(intents_path)
        else:
            self.intents = {
                'greeting': ['hello', 'hi', 'hey'],
                'farewell': ['bye', 'goodbye', 'see you'],
                'problem': ['issue', 'problem', 'error'],
                'question': ['how', 'what', 'why', 'when']
            }

    def load_knowledge_base(self, file_path):
        """Загрузка базы знаний из JSON файла"""
        if file_path.endswith('.json'):
            with open(file_path, 'r') as f:
                data = json.load(f)
            self.knowledge_base = pd.DataFrame(data)
        else:
            raise ValueError("Unsupported file format. Use JSON.")

        # Обучение векторизатора на вопросах из базы знаний
        if not self.knowledge_base.empty:
            self.vectorizer.fit(self.knowledge_base['question'])

    def load_intents(self, file_path):
        """Загрузка намерений из JSON файла"""
        with open(file_path, 'r') as f:
            self.intents = json.load(f)

    def preprocess_text(self, text):
        """
        Предварительная обработка текста:
        - Токенизация
        - Удаление стоп-слов
        - Лемматизация
        ###- Фильтрация по части речи (сохраняем существительные, глаголы, прилагательные)
        """
        tokens = word_tokenize(text.lower())
        filtered_tokens = []

        for token, tag in pos_tag(tokens):
            if token not in self.stop_words:
                pos = tag[0].lower()
                if pos in ['n', 'v', 'a']:  # существительные, глаголы, прилагательные
                    lemma = self.lemmatizer.lemmatize(token, pos='n' if pos == 'n' else 'v')
                    filtered_tokens.append(lemma)

        return filtered_tokens


    def extract_keywords(self, text):
        """Извлечение ключевых слов из текста"""
        return self.preprocess_text(text)

    def detect_intent(self, text):
        """
        Определение намерения пользователя

        Возвращает:
        - Наиболее вероятное намерение
        - Уверенность (0-1)
        """
        keywords = self.extract_keywords(text)
        best_intent = None
        best_score = 0

        for intent, patterns in self.intents.items():
            score = sum(1 for keyword in keywords if keyword in patterns)
            if score > best_score:
                best_score = score
                best_intent = intent

        confidence = best_score / len(keywords) if keywords else 0
        return best_intent, confidence

    def classify_category(self, text):
        """
        Классификация запроса по категориям из базы знаний

        Возвращает:
        - Наиболее вероятную категорию
        - Уверенность (0-1)
        """
        if self.knowledge_base.empty:
            return None, 0

        # Векторизация входного текста
        input_vec = self.vectorizer.transform([text])

        # Вычисление сходства с вопросами в базе знаний
        similarities = []
        for question in self.knowledge_base['question']:
            question_vec = self.vectorizer.transform([question])
            sim = cosine_similarity(input_vec, question_vec)[0][0]
            similarities.append(sim)

        # Находим наиболее похожий вопрос
        max_idx = np.argmax(similarities)
        max_sim = similarities[max_idx]

        if max_sim > 0:
            return self.knowledge_base.iloc[max_idx]['category'], max_sim
        return None, 0

    def find_answer(self, text):
        """
        Поиск ответа в базе знаний

        Возвращает:
        - Ответ (или None, если не найден)
        - Уверенность (0-1)
        - Альтернативные варианты (если уверенность низкая)
        """
        if self.knowledge_base.empty:
            return None, 0, []

        # Векторизация входного текста
        input_vec = self.vectorizer.transform([text])

        # Вычисление сходства с вопросами в базе знаний
        similarities = cosine_similarity(
            input_vec,
            self.vectorizer.transform(self.knowledge_base['question'])
        )[0]

        # Ранжирование результатов
        ranked_indices = np.argsort(similarities)[::-1]
        best_idx = ranked_indices[0]
        best_sim = similarities[best_idx]

        # Если уверенность высокая - возвращаем лучший ответ
        if best_sim >= self.confidence_threshold:
            return self.knowledge_base.iloc[best_idx]['answer'], best_sim, []

        # Иначе возвращаем несколько вариантов
        alternatives = []
        for idx in ranked_indices[:3]:
            if similarities[idx] > 0.1:  # минимальный порог сходства
                alternatives.append(self.knowledge_base.iloc[idx]['answer'])

        return None, best_sim, alternatives

    def generate_response(self, user_input):
        """
        Генерация ответа на основе пользовательского ввода

        Возвращает словарь с:
        - answer: основной ответ (или None)
        - confidence: уверенность (0-1)
        - alternatives: альтернативные ответы
        - needs_clarification: требуется ли уточнение
        - intent: определенное намерение
        - category: определенная категория
        - keywords: извлеченные ключевые слова
        """
        # Извлечение информации из запроса
        keywords = self.extract_keywords(user_input)
        intent, intent_confidence = self.detect_intent(user_input)
        category, category_confidence = self.classify_category(user_input)
        answer, answer_confidence, alternatives = self.find_answer(user_input)

        # Определение, требуется ли уточнение
        needs_clarification = (
            answer_confidence < self.confidence_threshold and
            len(alternatives) > 1 and
            intent not in ['greeting', 'farewell']
        )

        # Формирование ответа
        response = {
            'answer': answer,
            'confidence': answer_confidence,
            'alternatives': alternatives,
            'needs_clarification': needs_clarification,
            'intent': intent,
            'category': category,
            'keywords': keywords
        }

        return response

    def get_clarification_question(self, alternatives):
        """Генерация вопроса для уточнения"""
        options = "\n".join(f"{i+1}. {alt}" for i, alt in enumerate(alternatives[:3]))
        return f"Уточните, пожалуйста, что вас интересует:\n{options}"

    def get_low_confidence_response(self, alternatives):
        """Генерация ответа при низкой уверенности"""
        main_answer = "Извините, я не совсем уверен, но возможно вам подойдет один из этих вариантов:"
        options = "\n".join(f"- {alt}" for alt in alternatives[:3])
        return f"{main_answer}\n{options}"

# Пример использования
if __name__ == "__main__":
    # Инициализация бота с базой знаний и намерениями
    bot = SupportBotNLP(
        knowledge_base_path='dict_special.json',
        intents_path='intents.json'
    )

    # Пример диалога
    while True:
        user_input = input("Вы: ")
        if user_input.lower() in ['спасибо, досвидания', 'досвидания', 'пока']:
            print("Бот: До свидания!")
            break

        # Получение ответа
        response = bot.generate_response(user_input)

        # Формирование ответа в зависимости от уверенности
        if response['needs_clarification']:
            print("Бот:", bot.get_clarification_question(response['alternatives']))
        elif response['answer']:
            print("Бот:", response['answer'])
        elif response['alternatives']:
            print("Бot:", bot.get_low_confidence_response(response['alternatives']))
        else:
            print("Бот: Извините, я не понял ваш вопрос. Можете переформулировать?")