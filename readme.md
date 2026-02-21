1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ANS: getElementById -> find a html element by its id in js (ID string only)
     getElementByClassName -> find a html element by its class in js (class string only)
     querySelector -> find a html element by its selector in js (Any css selector)
     querySelectorAll -> find a html element by its selector in js (Any css selector)

2. How do you create and insert a new element into the DOM?
ANS: const newElement = document.createElement('div');
     newElement.innterHTML = `<h1>Hello World</h1>`;
     document.body.appendChild(newElement);

3. What is Event Bubbling? And how does it work?
ANS: Event Bubbling is a process where an event starts at the target element and then flows upward towards its parent elements  until it reaches the root element of the document.
    how it works -->>
    <html>
        <body>
            <div id="parent">
                <button id="child">Click Me</button>
            </div>

            <script>
                document.getElementById('parent').addEventListener('click', () => {
                    console.log('Parent Clicked');
                });

                document.getElementById('child').addEventListener('click', () => {
                    console.log('Child Clicked');
                });
            </script>
        </body>
    </html>

when the button "Click Me" is clicked it consoles "Child Clicked" and then the event goes up to the div and then it is called by the parent id and consoles "Parent Clicked".

4. What is Event Delegation in JavaScript? Why is it useful?
ANS: Event Delegation is