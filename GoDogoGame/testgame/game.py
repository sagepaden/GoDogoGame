import pygame
from gameObject import GameObject
# from player import Player
# from enemy import Enemy


class Game:
    def __init__(self):
        self.width = 800
        self.height = 800
        self.white_colour = (255, 255, 255)
        self.game_window = pygame.display.set_mode((self.width, self.height))
        self.clock = pygame.time.Clock()
        self.background = GameObject(
            0, 0, self.width, self.height, 'assets/background.png')
        self.treasure = GameObject(470, 370, 32, 32, 'assets/treasure.png')
        self.treasure1 = GameObject(320, 370, 32, 32, 'assets/treasure.png')
        self.level = 1.0
        # self.reset_map()

    def draw_objects(self):
        self.game_window.fill(self.white_colour)
        self.game_window.blit(self.background.image,
                              (self.background.x, self.background.y))
        self.game_window.blit(self.treasure.image,
                              (self.treasure.x, self.treasure.y))
        self.game_window.blit(self.treasure1.image,
                              (self.treasure1.x, self.treasure1.y))
        pygame.display.update()

    def run_game_loop(self):
        player_direction = 0
        while True:
            # Handle events
            events = pygame.event.get()
            for event in events:
                if event.type == pygame.QUIT:
                    return
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        player_direction = -1
                    elif event.key == pygame.K_DOWN:
                        player_direction = 1
                elif event.type == pygame.KEYUP:
                    if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                        player_direction = 0

            # Execute logic
            # self.move_objects(player_direction)
            # # Update display
            self.draw_objects()
            # # Detect collisions
            # if self.check_if_collided():
            #     self.reset_map()
            self.clock.tick(60)
