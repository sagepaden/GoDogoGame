import pygame
from sprites import *
from config import *
import sys


class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))
        self.clock = pygame.time.Clock()
        self.running = True
        self.font = pygame.font.Font("GoDogo/Marlboro.ttf", 32)

        self.dog_spritesheet = Spritesheet("GoDogo/img/DogSprite.png")
        self.background = pygame.image.load("GoDogo/img/background.png")
        self.intro_background = pygame.image.load("GoDogo/img/introbackground.png")
        self.invisible = pygame.image.load("GoDogo/img/invisible.png")
        # self.go_background = pygame.image.load('img/gameover.png')

    def createTilemap(self):
        for i, row in enumerate(tilemap):
            for j, column in enumerate(row):
                DummyBlock(self, j, i)
                # if column == "M":
                #     Ground(self, j, i)
                if column == "B":
                    Block(self, j, i)
                if column == "P":
                    Player(self, j, i)

    def createMapTilemap(self):
        for i, row in enumerate(maptilemap):
            for j, column in enumerate(row):
                if column == "M":
                    Ground(self, j, i)

    #             if column == "B":
    #                 Block(self, j, i)
    #             if column == "P":
    #                 Player(self, j, i)

    # def createTilemap(self):
    #     # Assuming "G" represents the ground area
    #     ground_image = self.background  # Use the entire background image for ground
    #     Ground(self, 0, 0, ground_image)

    #     for i, row in enumerate(maptilemap):
    #         for j, column in enumerate(row):
    #             if column == "B":
    #                 Block(self, j, i)
    #             elif column == "P":
    #                 Player(self, j, i)

    def new(self):
        # a new game starts
        self.playing = True

        self.all_sprites = pygame.sprite.LayeredUpdates()
        self.blocks = pygame.sprite.LayeredUpdates()

        self.createTilemap()
        self.createMapTilemap()

    def events(self):
        # game loop events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.playing = False
                self.running = False

    def update(self):
        # game loop updates
        self.all_sprites.update()

    # def draw_background(self):
    #     size = pygame.transform.scale(self.background, (600, 500))
    #     self.screen.blit(size, (0, 0))

    def draw(self):
        self.screen.fill(DOGOBLUE)
        # game loop draw
        self.all_sprites.draw(self.screen)
        self.clock.tick(FPS)
        pygame.display.update()

    def main(self):
        # game loop - every game has a loop
        while self.playing:
            # self.draw_background()
            self.events()
            self.update()
            self.draw()

    # def game_over(self):
    #     text = self.font.render('Game Over', True, WHITE)
    #     text_rect = text.get_rect(center=(WIN_WIDTH/2, WIN_HEIGHT/2))

    #     restart_button = Button(10, WIN_HEIGHT - 60, 120, 50, WHITE, BLACK, 'Restart', 32)

    #     for sprite in self.all_sprites:
    #         sprite.kill()

    #     while self.running:
    #         for event in pygame.event.get():
    #             if event.type == pygame.QUIT:
    #                 self.running = False

    #         mouse_pos = pygame.mouse.get_pos()
    #         mouse_pressed = pygame.mouse.get_pressed()

    #         if restart_button.is_pressed(mouse_pos, mouse_pressed):
    #             self.new()
    #             self.main()

    #         self.screen.blit(self.go_background, (0,0))
    #         self.screen.blit(text, text_rect)
    #         self.screen.blit(restart_button.image, restart_button.rect)
    #         self.clock.tick(FPS)
    #         pygame.display.update()

    def intro_screen(self):
        intro = True

        title = self.font.render("Your Dog Loves you, So Love Your Dog.", True, BLACK)
        title_rect = title.get_rect(x=140, y=240)

        play_button = Button(280, 140, 100, 50, WHITE, BLACK, "Play", 32)

        while intro:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    intro = False
                    self.running = False

            mouse_pos = pygame.mouse.get_pos()
            mouse_pressed = pygame.mouse.get_pressed()

            if play_button.is_pressed(mouse_pos, mouse_pressed):
                intro = False

            self.screen.blit(self.intro_background, (0, 0))
            self.screen.blit(title, title_rect)
            self.screen.blit(play_button.image, play_button.rect)
            self.clock.tick(FPS)
            pygame.display.update()


g = Game()
g.intro_screen()
g.new()
while g.running:
    g.main()

pygame.quit()
sys.exit()