'use strict';

        /**
         * Creates a button for kicking off the test and adds it to the DOM.
         *
         * @param {HTMLElement} context  the parent element to add the button to
         * @param {Test}        test     the test to be executed
         * @returns {HTMLElement} the button added to the test
         */
        function addButtonForTest(context, test) {
            let testButton = document.createElement('button');

            testButton.type = 'button';
            // Changed "Nashville" to "current" to accomodiate users in a different location. 
            testButton.innerText = 'Get the current Weather';
            testButton.onclick = () => test.run();

            context.appendChild(testButton);

            return testButton;
        }

        // Create the Test and add a button to the UI for running the test
        const test = new Test();
        const buttonContainer = document.getElementsByClassName('button-container')[0];

        addButtonForTest(buttonContainer, test);