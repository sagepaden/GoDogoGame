# 🐶 GoDogo Game 🐕

#### By Sage Paden, Jase Grable, Eva Kemp, Alesandria Wild

## **Technologies Used**

- Python
- Pygame
- Git
- VS Code
- Excalibur Js
- JavaScript

## **Description**

A game that showcases the GoDogo product.

## **Setup/Installation Requirements**

Pygame* is a free and open-source cross-platform library
for the development of multimedia applications like video games using Python.
It uses the `Simple DirectMedia Layer library`* and several other
popular libraries to abstract the most common functions, making writing
these programs a more intuitive task.

## Installation

Before installing pygame, you must check that Python is installed
on your machine. To find out, open a command prompt (if you have
Windows) or a terminal (if you have MacOS or Linux) and type this:
::

python --version

If a message such as "Python 3.8.10" appears, it means that Python
is correctly installed. If an error message appears, it means that
it is not installed yet. You must then go to the `official website
<https://www.pygame.org/docs/>`\_ and follow the instructions.

Once Python is installed, you have to perform a final check: you have
to see if pip is installed. Generally, pip is pre-installed with
Python but we are never sure. Same as for Python, type the following
command:
::

pip --version

If a message such as "pip 20.0.2 from /usr/lib/python3/dist-packages/pip
(python 3.8)" appears, you are ready to install pygame! To install
it, enter this command:
::

pip install pygame

## Help

If you are just getting started with pygame, you should be able to
get started fairly quickly. Pygame comes with many tutorials and
introductions. There is also full reference documentation for the
entire library. Browse the documentation on the `docs page`\_. You
can also browse the documentation locally by running
`python -m pygame.docs` in your terminal. If the docs aren't found
locally, it'll launch the online website instead.

The online documentation stays up to date with the development version
of pygame on GitHub. This may be a bit newer than the version of pygame
you are using. To upgrade to the latest full release, run
`pip install pygame --upgrade` in your terminal.

Best of all, the examples directory has many playable small programs
which can get you started playing with the code right away.

Pygame is a powerful library for game development, offering a wide
range of features to simplify your coding journey. Let's delve into
what pygame has to offer:

Graphics: With pygame, creating dynamic and engaging graphics has
never been easier. The library provides simple yet effective tools for
2D graphics and animation, including support for images, rectangles,
and polygon shapes. Whether you're a seasoned game developer or just
starting out, pygame has you covered.

Sound: Pygame also includes support for playing and manipulating sound
and music, making it easy to add sound effects and background music to
your games. With support for WAV, MP3, and OGG file formats, you have
plenty of options to choose from.

Input: Pygame provides intuitive functions for handling keyboard, mouse,
and joystick input, allowing you to quickly and easily implement player
controls in your games. No more struggling with complex input code, pygame
makes it simple.

Game Development: Lastly, pygame provides a comprehensive suite of tools
and features specifically designed for game development. From collision
detection to sprite management, pygame has everything you need to create
exciting and engaging games. Whether you're building a platformer, puzzle
game, or anything in between, pygame has you covered.

## Building From Source

If you want to use features that are currently in development,
or you want to contribute to pygame, you will need to build pygame
locally from its source code, rather than pip installing it.

Installing from source is fairly automated. The most work will
involve compiling and installing all the pygame dependencies. Once
that is done, run the `setup.py` script which will attempt to
auto-configure, build, and install pygame.

Much more information about installing and compiling is available
on the `Compilation wiki page`\_.

## Credits

Thanks to everyone who has helped contribute to this game.
Special thanks to those who provided tutorials and documentation about pygame.

Credit to ShawCode for his RPG tutorial series:
<https://youtube.com/playlist?list=PLkkm3wcQHjT7gn81Wn-e78cAyhwBW3FIc&si=q_Y8IjFF6yWX3tO_>

## Dependencies

Pygame is obviously strongly dependent on SDL and Python. It also
links to and embeds several other smaller libraries. The font
module relies on SDL_ttf, which is dependent on freetype. The mixer
(and mixer.music) modules depend on SDL_mixer. The image module
depends on SDL_image, which also can use libjpeg and libpng. The
transform module has an embedded version of SDL_rotozoom for its
own rotozoom function. The surfarray module requires the Python
NumPy package for its multidimensional numeric arrays.
Dependency versions:

+----------+------------------------+
| CPython | >= 3.6 (Or use PyPy3) |
+----------+------------------------+
| SDL | >= 2.0.8 |
+----------+------------------------+
| SDL_mixer| >= 2.0.0 |
+----------+------------------------+
| SDL_image| >= 2.0.2 |
+----------+------------------------+
| SDL_ttf | >= 2.0.11 |
+----------+------------------------+
| SDL_gfx | (Optional, vendored in)|
+----------+------------------------+
| NumPy | >= 1.6.2 (Optional) |
+----------+------------------------+

## License

This library is distributed under `GNU LGPL version 2.1`\_, which can
be found in the file `docs/LGPL.txt`. We reserve the right to place
future versions of this library under a different license.

This basically means you can use pygame in any project you want,
but if you make any changes or additions to pygame itself, those
must be released with a compatible license (preferably submitted
back to the pygame project). Closed source and commercial games are fine.

The programs in the `examples` subdirectory are in the public domain.

See docs/licenses for licenses of dependencies.

.. \_pygame: https://www.pygame.org
.. \_Simple DirectMedia Layer library: https://www.libsdl.org
.. \_We need your help: https://www.pygame.org/contribute.html
.. \_Compilation wiki page: https://www.pygame.org/wiki/Compilation
.. \_docs page: https://www.pygame.org/docs/
.. \_GNU LGPL version 2.1: https://www.gnu.org/copyleft/lesser.html
