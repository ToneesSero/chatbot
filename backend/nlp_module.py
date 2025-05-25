# backend/nlp_module.py
from support_bot_nlp import SupportBotNLP

# Создание экземпляра (пути могут быть абсолютными или относительными)
bot = SupportBotNLP(
    knowledge_base_path='dict_special.json',
    intents_path='intents.json'
)

def get_bot_answer(user_input):
    answer = "Бот: Извините, я не понял ваш вопрос. Можете переформулировать?"
    response = bot.generate_response(user_input)

    if response['needs_clarification']:
        answer = bot.get_clarification_question(response['alternatives'])
    elif response['answer']:
        answer = response['answer']
    elif response['alternatives']:
        answer = bot.get_low_confidence_response(response['alternatives'])
    elif user_input.lower() in ['спасибо, досвидания', 'досвидания', 'пока']:
            answer = "До свидания!"

    return answer

def get_bot_response(user_input):
    response = bot.generate_response(user_input)

    return response