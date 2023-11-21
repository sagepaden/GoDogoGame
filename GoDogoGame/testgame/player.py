from gameObject import GameObject

# Our Player class is a subclass of GameObject


class Player(GameObject):

    def __init__(self, x, y, width, height, image_path, speed):
        super().__init__(x, y, width, height, image_path)

        self.speed = speed

    # Moving the player character on the screen

    def move(self, direction, max_height):
        if (self.y >= max_height-self.height and direction > 0) or (self.y == 0 and direction < 0):
            return
<<<<<<< HEAD
        self.y += (direction * self.speed)
=======
        self.y += (direction * self.speed)
>>>>>>> 95838f95239c06d0b7a1dc5072574de402d237f4
