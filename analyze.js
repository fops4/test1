const { exec } = require('child_process');
const nodemailer = require('nodemailer');

// Fonction pour exécuter ESLint et analyser le code
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
        sendEmail(stdout);  // Appel de sendEmail avec les suggestions comme argument
    });
}

// Fonction pour envoyer les suggestions par e-mail
function sendEmail(suggestions) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Remplacez par le serveur SMTP
        port: 587,
        secure: false,
        auth: {
            user: 'votre-email@example.com',  // Remplacez par votre adresse e-mail
            pass: 'motdepasse'                // Remplacez par votre mot de passe
        }
    });

    let mailOptions = {
        from: '"Analyse Code" <votre-email@example.com>',
        to: 'utilisateur@example.com',         // Remplacez par l'e-mail du destinataire
        subject: 'Suggestions de code après le commit',
        text: suggestions
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Erreur lors de l'envoi de l'e-mail : ${error}`);
        }
        console.log('Suggestions envoyées: %s', info.messageId);
    });
}

// Appeler la fonction d’analyse
analyzeCode();
