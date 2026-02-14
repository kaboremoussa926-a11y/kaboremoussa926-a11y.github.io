document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du formulaire
    const form = document.getElementById('inscriptionForm');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalMessage = document.getElementById('modal-message');
    const formMessage = document.getElementById('form-message');

    // Validation en temps réel
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valider tous les champs avant soumission
        let isValid = true;
        form.querySelectorAll('input[required], select[required]').forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simuler l'envoi des données (remplacer par un vrai appel AJAX en production)
            simulateSubmission();
        } else {
            formMessage.textContent = "Veuillez corriger les erreurs dans le formulaire.";
            formMessage.className = "form-message error";
        }
    });

    // Fonction de validation des champs
    function validateField(field) {
        const errorElement = document.getElementById(${field.id}-error);
        errorElement.style.display = 'none';
        
        if (field.required && !field.value.trim()) {
            showError(field, errorElement, "Ce champ est obligatoire.");
            return false;
        }

        // Validation spécifique pour le téléphone
        if (field.type === 'tel' && field.value.trim() && !/^[0-9]{10}$/.test(field.value.trim())) {
            showError(field, errorElement, "Veuillez entrer un numéro valide (10 chiffres).");
            return false;
        }

        // Validation pour la date de naissance
        if (field.type === 'date' && field.value) {
            const birthDate = new Date(field.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18) {
                showError(field, errorElement, "Vous devez avoir au moins 18 ans.");
                return false;
            }
        }

        return true;
    }

    function showError(field, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#dc3545';
    }

    // Simulation d'envoi de formulaire
    function simulateSubmission() {
        // Afficher l'indicateur de chargement
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        // Simuler un délai de réseau
        setTimeout(() => {
            // Réinitialiser le bouton
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Afficher le message de succès
            const formData = new FormData(form);
            const participantName = ${formData.get('prenom')} ${formData.get('nom')};
            
            // Afficher la modal de confirmation
            modalMessage.textContent = Merci ${participantName}, votre inscription a été enregistrée avec succès. Un email de confirmation vous a été envoyé.;
            showModal();
            
            // Réinitialiser le formulaire
            form.reset();
            formMessage.style.display = 'none';
            
            // Vous pouvez ajouter ici un vrai appel AJAX pour envoyer les données au serveur
            // Exemple avec fetch():
            /*
            fetch('votre-endpoint-api', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Gérer la réponse du serveur
            })
            .catch(error => {
                // Gérer les erreurs
            });
            */
        }, 1500);
    }

    // Gestion de la modal
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', hideModal);
    modalCloseBtn.addEventListener('click', hideModal);

    // Fermer la modal en cliquant à l'extérieur
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Animation des sections du formulaire
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = all 0.5s ease ${index * 0.1}s;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
});