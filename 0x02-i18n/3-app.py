#!/usr/bin/env python3
''' <TODO> add documentation '''
from flask import Flask, render_template, request
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

#@babel.localeselector
def get_locale() -> str:
    ''' gets locale '''
    return request.accept_languages.best_match(app.config['LANGUAGES'])

babel.init_app(app, locale_selector=get_locale)

@app.route('/', strict_slashes=False)
def index() -> str:
    ''' index page '''
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')

