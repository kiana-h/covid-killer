# Covid Killer

Live Website: [https://kiana-h.github.io/covid-killer/](https://kiana-h.github.io/covid-killer/)

I initially created Covid Killer as a canvas animation which simulated the spread of Covid-19 based on certain variables (number of infected/healthy cells and their movement). That animation evolved into a game!  

The player controls a white blood cell which tries to destroy all the floating corona virus cells before they infect the healthy cells.
The game has 3 difficulty levels which correspond to the speed of the moving objects: Shelter-in-Place, Normal, and Trump Rally!
Increasing the number of virus and healthy cell objects also increases the difficulty.  

Differenet collision handler functions are implemented to manage the interaction of objects. For the corona virus objects, the collision response simulates a bumping/bouncing effect similar to real world objects. The speed and angle of each object after collision is calculated based on the velocity of the two objects upon collision.  
  
  

![Game Play](https://github.com/kiana-h/covid-killer/blob/main/readme_assets/gameplay.gif)

## Technologies

- Javascript 
- HTML Canvas
