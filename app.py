import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
import wikipedia
if os.path.exists("env.py"):
    import env

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    lang = wikipedia.languages()
    languages = []
    for i in lang:
        languages.append(wikipedia.languages()[i])

    if request.method == "POST":
        try:
            query = request.form.get('query')
            try:
                result = wikipedia.summary(query)
            except wikipedia.exceptions.DisambiguationError:
                stra = "There May Be Multiple Articles About The Topic "
                strb = " Please Be More Specific!"
                result = stra + query + strb
            return render_template("index.html",
                                   result=result)
        except:
            pass

    return render_template("index.html", languages=languages)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
