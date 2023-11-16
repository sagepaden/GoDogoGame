import pygame
from config import *
import math
import random


class Spritesheet:
    def __init__(self, file):
        self.sheet = pygame.image.load(file).convert()

    def get_sprite(self, x, y, width, height):
        sprite = pygame.Surface([width, height])
        sprite.blit(self.sheet, (0, 0), (x, y, width, height))
        sprite.set_colorkey(0)
        return sprite


class Player(pygame.sprite.Sprite):
    def __init__(self, game, x, y):
        self.game = game
        self._layer = PLAYER_LAYER
        self.groups = self.game.all_sprites
        pygame.sprite.Sprite.__init__(self, self.groups)

        self.x = x * TILESIZE
        self.y = y * TILESIZE
        self.width = SPRITETILE
        self.height = SPRITETILE

        self.x_change = 0
        self.y_change = 0

        self.facing = "down"
        self.animation_loop = 1

        self.image = self.game.dog_spritesheet.get_sprite(
            64, 256, self.width, self.height
        )

        self.rect = self.image.get_rect()
        self.rect.x = self.x
        self.rect.y = self.y

    def update(self):
        self.movement()
        self.animate()

        self.rect.x += self.x_change
        self.collide_blocks("x")
        self.rect.y += self.y_change
        self.collide_blocks("y")

        self.x_change = 0
        self.y_change = 0

    def movement(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            for sprite in self.game.all_sprites:
                sprite.rect.x += PLAYER_SPEED
            self.x_change -= PLAYER_SPEED
            self.facing = "left"
        if keys[pygame.K_RIGHT]:
            for sprite in self.game.all_sprites:
                sprite.rect.x -= PLAYER_SPEED
            self.x_change += PLAYER_SPEED
            self.facing = "right"
        if keys[pygame.K_UP]:
            for sprite in self.game.all_sprites:
                sprite.rect.y += PLAYER_SPEED
            self.y_change -= PLAYER_SPEED
            self.facing = "up"
        if keys[pygame.K_DOWN]:
            for sprite in self.game.all_sprites:
                sprite.rect.y -= PLAYER_SPEED
            self.y_change += PLAYER_SPEED
            self.facing = "down"
        if keys[pygame.K_z]:
            for sprite in self.game.all_sprites:
                sprite.rect.y -= 0
            self.y_change += 0
            self.facing = "sit"
        if keys[pygame.K_x]:
            for sprite in self.game.all_sprites:
                sprite.rect.y -= 0
            self.y_change += 0
            self.facing = "lay"

    def collide_blocks(self, direction):
        if direction == "x":
            hits = pygame.sprite.spritecollide(self, self.game.blocks, False)
            if hits:
                if self.x_change > 0:
                    self.rect.x = hits[0].rect.left - self.rect.width
                if self.x_change < 0:
                    self.rect.x = hits[0].rect.right

        if direction == "y":
            hits = pygame.sprite.spritecollide(self, self.game.blocks, False)
            if hits:
                if self.y_change > 0:
                    self.rect.y = hits[0].rect.top - self.rect.height
                if self.y_change < 0:
                    self.rect.y = hits[0].rect.bottom

    def animate(self):
        up_animations = [
            self.game.dog_spritesheet.get_sprite(0, 0, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 0, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 0, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 0, self.width, self.height),
        ]

        left_animations = [
            self.game.dog_spritesheet.get_sprite(0, 65, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 65, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 65, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 65, self.width, self.height),
        ]

        right_animations = [
            self.game.dog_spritesheet.get_sprite(0, 128, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 128, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 128, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 128, self.width, self.height),
        ]

        down_animations = [
            self.game.dog_spritesheet.get_sprite(0, 192, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 192, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 192, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 192, self.width, self.height),
        ]

        sit_animations = [
            self.game.dog_spritesheet.get_sprite(0, 256, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 256, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 256, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 256, self.width, self.height),
        ]

        lay_animations = [
            self.game.dog_spritesheet.get_sprite(0, 320, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(65, 320, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(128, 320, self.width, self.height),
            self.game.dog_spritesheet.get_sprite(192, 320, self.width, self.height),
        ]

        if self.facing == "down":
            if self.y_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    0, 192, self.width, self.height
                )
            else:
                self.image = down_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0.1
                if self.animation_loop >= 3:
                    self.animation_loop = 1

        if self.facing == "up":
            if self.y_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    0, 0, self.width, self.height
                )
            else:
                self.image = up_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0.1
                if self.animation_loop >= 3:
                    self.animation_loop = 1

        if self.facing == "left":
            if self.x_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    0, 65, self.width, self.height
                )
            else:
                self.image = left_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0.1
                if self.animation_loop >= 3:
                    self.animation_loop = 1

        if self.facing == "right":
            if self.x_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    0, 128, self.width, self.height
                )
            else:
                self.image = right_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0.1
                if self.animation_loop >= 3:
                    self.animation_loop = 1

        if self.facing == "sit":
            if self.y_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    65, 256, self.width, self.height
                )
            else:
                self.image = sit_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0
                if self.animation_loop >= 0:
                    self.animation_loop = 0

        if self.facing == "lay":
            if self.y_change == 0:
                self.image = self.game.dog_spritesheet.get_sprite(
                    128, 320, self.width, self.height
                )
            else:
                self.image = lay_animations[math.floor(self.animation_loop)]
                self.animation_loop += 0
                if self.animation_loop >= 0:
                    self.animation_loop = 0


class Block(pygame.sprite.Sprite):
    def __init__(self, game, x, y):
        self.game = game
        self._layer = BLOCK_LAYER
        self.groups = self.game.all_sprites
        pygame.sprite.Sprite.__init__(self, self.groups)

        self.x = x * TILESIZE
        self.y = y * TILESIZE
        self.width = TILESIZE
        self.height = TILESIZE

        self.image = self.game.invisible

        self.rect = self.image.get_rect()
        self.rect.x = self.x
        self.rect.y = self.y

class DummyBlock(pygame.sprite.Sprite):
    def __init__(self, game, x, y):
        self.game = game
        self._layer = BLOCK_LAYER
        self.groups = self.game.all_sprites
        pygame.sprite.Sprite.__init__(self, self.groups)

        self.x = x * TILESIZE
        self.y = y * TILESIZE
        self.width = TILESIZE
        self.height = TILESIZE

        self.image = self.game.invisible

        self.rect = self.image.get_rect()
        self.rect.x = self.x
        self.rect.y = self.y


class Ground(pygame.sprite.Sprite):
    def __init__(self, game, x, y):
        self.game = game
        self._layer = GROUND_LAYER
        self.groups = self.game.all_sprites
        pygame.sprite.Sprite.__init__(self, self.groups)

        self.x = x * MAP_W_TILESIZE
        self.y = y * MAP_H_TILESIZE
        self.width = MAP_W_TILESIZE
        self.height = MAP_H_TILESIZE

        self.image = self.game.background

        self.rect = self.image.get_rect()
        self.rect.x = self.x
        self.rect.y = self.y


class Button:
    def __init__(self, x, y, width, height, fg, bg, content, fontsize):
        self.font = pygame.font.Font("Marlboro.ttf", fontsize)
        self.content = content

        self.x = x
        self.y = y
        self.width = width
        self.height = height

        self.fg = fg
        self.bg = bg

        self.image = pygame.Surface((self.width, self.height))
        self.image.fill(self.bg)
        self.rect = self.image.get_rect()

        self.rect.x = self.x
        self.rect.y = self.y

        self.text = self.font.render(self.content, True, self.fg)
        self.text_rect = self.text.get_rect(center=(self.width / 2, self.height / 2))
        self.image.blit(self.text, self.text_rect)

    def is_pressed(self, pos, pressed):
        if self.rect.collidepoint(pos):
            if pressed[0]:
                return True
            return False
        return False
