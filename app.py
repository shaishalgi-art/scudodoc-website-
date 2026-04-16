from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/technology')
def technology():
    return render_template('technology.html')


@app.route('/esg')
def esg():
    return render_template('esg.html')


@app.route('/market')
def market():
    return render_template('market.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
