// voice-ai.js

document.getElementById('start-btn').addEventListener('click', () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        document.getElementById('status').innerText = 'Listening...';
    };

    recognition.onspeechend = () => {
        document.getElementById('status').innerText = 'Processing...';
        recognition.stop();
    };

    recognition.onerror = (event) => {
        document.getElementById('status').innerText = `Error: ${event.error}`;
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('status').innerText = 'Processing complete.';
        generateResponse(transcript);
    };

    recognition.start();
});

function generateResponse(question) {
    const responseElement = document.getElementById('response');
    let response = '';

    // Basic responses for demonstration purposes
    if (question.includes('menu')) {
        response = 'Burgers\nCheeseburger: Beef patty with cheese, lettuce, tomato, pickles, onions, and condiments.\nHamburger: Beef patty with or without cheese, lettuce, tomato, pickles, onions, and condiments.\nBacon Burger: Beef patty with bacon, cheese, lettuce, tomato, and condiments.\nDouble Cheeseburger: Two beef patties with cheese, lettuce, tomato, pickles, onions, and condiments.';
    } else if (question.includes('about hotel')) {
        response = 'Overview: Welcome to The Chat Bistro, where culinary creativity meets warm, inviting ambiance. Our restaurant offers a diverse menu designed to delight your taste buds with fresh, high-quality ingredients and innovative recipes. Whether you are here for a casual meal or a special occasion, we aim to provide an exceptional dining experience.';
    }else if (question.includes('special features')) {
        response = 'Weekly Specials: Our chef creates special dishes each week based on seasonal ingredients and local produce.\nHappy Hour: Enjoy discounted appetizers and drinks during our daily happy hour from 4 PM to 6 PM.\nPrivate Dining: We offer private dining options for events and special occasions, with customizable menus to suit your needs.';
    } else {
        response = 'I’m not sure how to answer that. Can you ask something else?';
    }

    responseElement.innerText = response;
}

