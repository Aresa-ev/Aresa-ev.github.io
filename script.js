document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.getElementById('booking-form');
    const packageSelect = document.getElementById('selected-package');
    const travelersInput = document.getElementById('travelers-count');
    const calcTotalElement = document.getElementById('calc-total');
    const hiddenTotalInput = document.getElementById('hidden-total-amount');

    function updateEstimate() {
        if (!packageSelect || !travelersInput || !calcTotalElement) return;

        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        const pricePerPax = selectedOption ? Number(selectedOption.dataset.price) : 0;
        const travelers = Math.max(1, Number(travelersInput.value) || 1);

        if (!pricePerPax) {
            calcTotalElement.textContent = '₱N/A';
            if (hiddenTotalInput) hiddenTotalInput.value = '₱0.00';
            return;
        }

        const total = pricePerPax * travelers;
        const formattedTotal = '₱' + total.toLocaleString('en-PH');
        calcTotalElement.textContent = formattedTotal;
        if (hiddenTotalInput) hiddenTotalInput.value = formattedTotal;
    }

    if (packageSelect) packageSelect.addEventListener('change', updateEstimate);
    if (travelersInput) travelersInput.addEventListener('input', updateEstimate);
    updateEstimate();

    if (formElement) {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            updateEstimate();

            if (typeof emailjs === 'undefined') {
                alert('Email service is still loading. Please refresh and try again.');
                return;
            }

            const SERVICE_ID = 'service_2g2efjj';
            const TEMPLATE_ID = 'template_54dnp2q';

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    const ticketName = document.getElementById('from_name');
                    const ticketPkg = document.getElementById('package_name');
                    const ticketDate = document.getElementById('travel_date');
                    const ticketCount = document.getElementById('travelers_count');
                    const ticketTotal = document.getElementById('ticket-total');
                    const ticketRef = document.getElementById('ticket-ref');
                    
                    if (ticketName) ticketName.textContent = document.getElementById('full-name').value;
                    if (ticketPkg && packageSelect && packageSelect.selectedIndex > -1) {
                        ticketPkg.textContent = packageSelect.options[packageSelect.selectedIndex].text;
                    }
                    if (ticketDate) ticketDate.textContent = document.getElementById('travel-date').value;
                    if (ticketCount) ticketCount.textContent = travelersInput.value;
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
                    updateEstimate();
                }, function (error) {
                    console.error('FAILED...', error);
                    alert('Oops! Failed to send the booking inquiry. Please check your internet connection and try again.');
                });
        });
    }
});