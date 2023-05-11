# Ant Simulation
Simple showcase of a SwarmSimulation using very very basic rules.

Each "ant" object has a list of targets and a home base, each "ant" counts how many steps it has taken since it has touched either a target or home.
This count will be reset once an "ant" has reached a goal position.

The Swarm behaviour is them created by each "ant" communicating with any "ant" within its radius, if the talking "ant" finds that another "ant" has a higher step count to any goal
it will inform that "ant" to change direction to itself as well as set their counter to its own counter value.

Changing the random value in the MoveObjects will make the ants better at following
Small goal distances will also improve the swarming
