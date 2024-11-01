const { exec } = require('child_process');

function analyzeCode() {
    exec('npx eslint src/ --format stylish', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur d'exécution ESLint: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erreur: ${stderr}`);
            return;
        }
        console.log('Résultats de l’analyse :\n', stdout);
        sendEmail(stdout);  // Envoyer les suggestions par e-mail
    });
}

analyzeCode();
