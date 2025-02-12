// Send quest data to server (you need to implement server-side logic here)
const formData = new FormData();
formData.append('questName', questName);
formData.append('questDescription', questDescription);
formData.append('numQuestions', numQuestions);
formData.append('timeLimit', timeLimit);
formData.append('taskType', taskType);
formData.append('questImage', questImage);

fetch('/save-quest', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    alert("Квест збережено!");
    window.location.href = data.questLink; // Link to published quest
})
.catch(error => console.error('Error:', error));


function submitRating() {
let rating = document.getElementById("rating-value").value;

// Send rating data to the server
fetch('/submit-rating', {
    method: 'POST',
    body: JSON.stringify({ rating }),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    document.getElementById("avg-rating").innerText = data.avgRating;
    alert("Дякуємо за вашу оцінку!");
})
.catch(error => console.error('Error:', error));
}

/*2. Серверна частина (Python + Flask)

from flask import Flask, request, jsonify
import os

app = Flask(name)
QUESTS = []
RATINGS = {}

@app.route('/save-quest', methods=['POST'])
def save_quest():
quest_name = request.form['questName']
quest_description = request.form['questDescription']
num_questions = request.form['numQuestions']
time_limit = request.form['timeLimit']
task_type = request.form['taskType']
quest_image = request.files['questImage']

quest = {
    'name': quest_name,
    'description': quest_description,
    'num_questions': num_questions,
    'time_limit': time_limit,
    'task_type': task_type,
    'image': quest_image.filename,
    'link': f'/quest/{len(QUESTS) + 1}'
}

# Save image to server
image_path = os.path.join('static/images', quest_image.filename)
quest_image.save(image_path)

QUESTS.append(quest)
return jsonify({'questLink': quest['link']})


@app.route('/submit-rating', methods=['POST'])
def submit_rating():
rating = request.json['rating']
if rating not in RATINGS:
    RATINGS[rating] = []
RATINGS[rating].append(rating)

# Calculate average rating
total_ratings = sum([r * len(RATINGS[r]) for r in RATINGS for r in RATINGS[r]])
count = sum([len(RATINGS[r]) for r in RATINGS])
avg_rating = total_ratings / count if count > 0 else 0

return jsonify({'avgRating': avg_rating})


if name == 'main':
app.run(debug=True)

Пояснення:

1. Конструктор квестів: Це форма, де користувач може ввести дані про квест (назва, опис, кількість завдань, час на проходження, тип завдань, зображення).


2. Простір для проходження: Додано можливість оцінювати квест і показувати середній рейтинг.


3. Збереження та публікація квестів: Використовуються методи Flask для збереження даних про квест у пам'яті та публікації за посиланням.



Для публікації квестів на сайті вам потрібно налаштувати сервер (Flask або іншу платформу) та базу даних для зберігання квестів і оцінок.*/