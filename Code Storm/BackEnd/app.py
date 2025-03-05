from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("C:/Users/Jayadeva M R/Downloads/HackRon_CodeStorm")
def home():
    return "Flask is running!"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Here you can add logic to verify the username and password
        # For now, we'll just redirect to the home page
        return redirect(url_for('home'))
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)