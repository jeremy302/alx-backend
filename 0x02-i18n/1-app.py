#!/usr/bin/python3
''' <TODO> add documentation '''
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    ''' config class '''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app = Flask(__name__)
app.config['LANGUAGES'] = (Config.LANGUAGES)
app.config['BABEL_DEFAULT_LOCALE'] = (Config.BABEL_DEFAULT_LOCALE)
app.config['BABEL_DEFAULT_TIMEZONE'] = (Config.BABEL_DEFAULT_TIMEZONE)

babel = Babel(app)


@app.route('/', strict_slashes=False)
def index() -> str:
    ''' index page '''
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')

