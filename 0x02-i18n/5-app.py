#!/usr/bin/env python3
''' <TODO> add documentation '''
from typing import Dict
from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config:
    ''' config class '''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    ''' gets locale '''
    lang = request.args.get('locale')
    if lang in app.config['LANGUAGES']:
        return lang
    return request.accept_languages.best_match(app.config['LANGUAGES'])


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Dict:
    ''' gets a user '''
    login_as = request.args.get('login_as')
    return users.get(int(login_as)) if login_as is not None else None


@app.before_request
def before_request() -> None:
    ''' sets user '''
    g.user = get_user()


@app.route('/', strict_slashes=False)
def index() -> str:
    ''' index page '''
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
