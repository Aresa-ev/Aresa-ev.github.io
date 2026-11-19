document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('booking-form');

    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault();

            const calcTotalElement = document.getElementById('calc-total');
            const hiddenTotalInput = document.getElementById('hidden-total-amount');
            if (calcTotalElement && hiddenTotalInput) {
                hiddenTotalInput.value = calcTotalElement.textContent;
            }

            const SERVICE_ID = 'service_2g2efjj';
            const TEMPLATE_ID = 'template_54dnp2q';

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);

                    const ticketName = document.getElementById('ticket-name');
                    const ticketPkg = document.getElementById('ticket-pkg');
                    const ticketDate = document.getElementById('ticket-date');
                    const ticketCount = document.getElementById('ticket-count');
                    const ticketTotal = document.getElementById('ticket-total');
                    const ticketRef = document.getElementById('ticket-ref');

                    if (ticketName) ticketName.textContent = document.getElementById('full-name').value;
                    if (ticketPkg) {
                        const pkgSelect = document.getElementById('selected-package');
                        ticketPkg.textContent = pkgSelect.options[pkgSelect.selectedIndex].text;
                    }
                    if (ticketDate) ticketDate.textContent = document.getElementById('travel-date').value;
                    if (ticketCount) ticketCount.textContent = document.getElementById('travelers-count').value;
                    if (ticketTotal && calcTotalElement) ticketTotal.textContent = calcTotalElement.textContent;
                    
                    if (ticketRef) {
                        const randomNum = Math.floor(1000 + Math.random() * 9000);
                        ticketRef.textContent = `CAL-2026-${randomNum}`;
                    }

                    const confirmationModal = document.getElementById('confirmation-modal');
                    if (confirmationModal) {
                        confirmationModal.classList.add('active');
                    }

                    formElement.reset();

                }, function(error) {
                    console.error('FAILED...', error);
                    alert('Oops! Failed to send the booking inquiry. Please check your internet connection and try again.');
                });
        });
    }
});