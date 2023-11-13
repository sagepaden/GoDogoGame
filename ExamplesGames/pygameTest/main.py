import pygame
from sprites import *
from config import *
import sys

class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font('Arial', 32)
        self.running = True

    def new(self):
        # a new game starts
        self.playing = True

        # contains all sprites character, walls, enemies
        self.all_sprites = pygame.sprite.LayeredUpdates()
        # walls
        self.blocks = pygame.sprite.LayeredUpdates()
        # enemies
        self.enemies = pygame.sprite.LayeredUpdates()
        # attack sprites
        self.attacks = pygame.sprite.LayeredUpdates()

        self.player = Player(self, 1, 2)

    def events(self):

    def update(self):

    def draw(self):
    
    def main(self):

    def game_over(self):

    def intro_screen(self):
