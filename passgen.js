document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('m');
    const slider = document.getElementById('slider');
    const passwordLengthDisplay = document.querySelector('#passlen p:last-child');
    const checkboxes = {
        uppercase: document.getElementById('c1'),
        lowercase: document.getElementById('c2'),
        numbers: document.getElementById('c3'),
        symbols: document.getElementById('c4')
    };
    const strengthIndicator = document.getElementById('dot');
    const generateButton = document.getElementById('passbutt');
    const copyButton = document.getElementById('n');

    const updatePasswordLength = () => {
        passwordLengthDisplay.textContent = slider.value;
    };

    const getRandomUppercase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const getRandomLowercase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    const getRandomSymbol = () => {
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    const generatePassword = () => {
        const length = parseInt(slider.value);
        const options = [];

        if (checkboxes.uppercase.checked) options.push(getRandomUppercase);
        if (checkboxes.lowercase.checked) options.push(getRandomLowercase);
        if (checkboxes.numbers.checked) options.push(getRandomNumber);
        if (checkboxes.symbols.checked) options.push(getRandomSymbol);

        if (options.length === 0) {
            passwordInput.value = '';
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomFunc = options[Math.floor(Math.random() * options.length)];
            password += randomFunc();
        }

        passwordInput.value = password;
        updateStrengthIndicator();
    };

    const updateStrengthIndicator = () => {
        const length = parseInt(slider.value);
        const hasUppercase = checkboxes.uppercase.checked;
        const hasLowercase = checkboxes.lowercase.checked;
        const hasNumbers = checkboxes.numbers.checked;
        const hasSymbols = checkboxes.symbols.checked;

        const criteriaCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;

        if (length >= 12 && criteriaCount === 4) {
            strengthIndicator.style.backgroundColor = 'green';
        } else if (length >= 8 && criteriaCount >= 3) {
            strengthIndicator.style.backgroundColor = 'yellow';
        } else {
            strengthIndicator.style.backgroundColor = 'red';
        }
    };

    const copyToClipboard = () => {
        if (passwordInput.value) {
            passwordInput.select();
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        }
    };

    slider.addEventListener('input', updatePasswordLength);
    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);
});
