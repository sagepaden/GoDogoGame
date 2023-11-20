import pygame


class GameObject:

    def __init__(self, x, y, width, height, image_path):
        # Loading the images from the image paths
        image = pygame.image.load(image_path)
        self.image = pygame.transform.scale(image, (width, height))

        # Saving the parameters as properties of the class objects
        self.x = x
        self.y = y
        self.width = width
        self.height = height
