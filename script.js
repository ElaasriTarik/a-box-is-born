
// parent box
const root = document.getElementsByClassName('root')[0];

const boxes = []

for (let i = 0; i < 10; i++) {
    createBox()
}

function isBoxInsideRoot(box) {
    const boxRect = box.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    return (boxRect.top >= rootRect.top &&
        boxRect.left >= rootRect.left &&
        boxRect.bottom <= rootRect.bottom &&
        boxRect.right <= rootRect.right
        )
}

function getBoxPosition(box) {
    const boxRect = box.getBoundingClientRect();
    return {
        top: boxRect.top,
        left: boxRect.left
    };
}

// move the box to a random position
function moveBox(box) {
    let x = (Math.random() * 60) * (Math.random() < 0.5 ? -1 : 1);
    let y = (Math.random() * 60) * (Math.random() < 0.5 ? -1 : 1);
    console.log(x, y);
    // add values to the position until the box is outside the parent

    const intervalId = setInterval(() => {
        const position = getBoxPosition(box);
        console.log(position.top, position.left);


        box.style.top = (parseInt(box.style.top || 0) + y ) + 'px';
        box.style.left = (parseInt(box.style.left || 0) + x) + 'px';

        if (!isBoxInsideRoot(box)) {
            // Stop the interval if the box is outside the parent
            // clearInterval(intervalId);
            // make the box bounce back if it hits the side of the root
            if (position.top >= root.getBoundingClientRect().bottom - box.offsetHeight - 10 || position.top <= root.getBoundingClientRect().top + 10) {
                y = -Math.abs(y);
                x = -Math.abs(x);
            }

            
            createBox()
        }
    }, 200);
}

// function to create a new box
function createBox() {
    const box = document.createElement('div');
    box.classList.add('box');
    root.append(box);

    const rootRect = root.getBoundingClientRect();
    box.style.position = 'absolute';
    box.style.top = (rootRect.height / 2 - box.offsetHeight / 2) + 'px';
    box.style.left = (rootRect.width / 2 - box.offsetWidth / 2) + 'px';
    // random color
    box.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    boxes.push(box);
    moveBox(box);
}

