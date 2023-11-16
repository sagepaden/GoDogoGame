import pygame
from game import Game

pygame.init()

# creating a new instance of Game
game = Game()
# Calling the run_game_loop method
game.run_game_loop()

pygame.quit()
quit()