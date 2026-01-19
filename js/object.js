class Validator{
    constructor(userAnswer){
        this.userAnswer = userAnswer,
        this.answers = this.answerFiller(),
        this.score = 0,
        this.accuracy = 0
    }

    validateAnswers(){
        for(let i = 0; i < this.userAnswer.length; i++){
            if(this.answers[i] === this.userAnswer[i]){
                this.score += 1
            }else if(typeof this.answers[i] ===  "number"){
                if(this.answers[i] === Number(this.userAnswer[i])){
                    this.score += 1
                }
            }
        }
        this.accuracyCounter()
        let res = `${this.score} / 15. Nota de: ${this.accuracy}`
        return res
    }

    accuracyCounter(){
        this.accuracy = (this.score * 10) / 15
    }

    answerFiller(){
        return ["Cerebro","Aluminio","Nuclear","Nigeria","Andes","Sudáfrica","Mongol","Elcano", "Siglo XVIII", "Arthur Conan Doyle", "Japón","Leonardo da Vinci", 12, 180, "Siempre par"]
    }

    answerGridSender(){
        let grid = [
            [" ","B"," "],
            [" ","B"," "],
            ["A"," "," "],
            [" ","B"," "],
            ["A"," "," "],
            ["A"," "," "],
            [" "," ","C"],
            [" ","B"," "],
            [" ","B"," "],
            [" ","B"," "],
            [" "," ","C"],
            [" ","B"," "],
            [" ","B"," "],
            [" ","B"," "],
            ["A"," "," "]
        ]
        return grid
    }

    answerGridSenderV2(){
        let grid = [
            [" ",`${this.answers[0]}`," "],
            [" ",`${this.answers[1]}`," "],
            [`${this.answers[2]}`," "," "],
            [" ",`${this.answers[3]}`," "],
            [`${this.answers[4]}`," "," "],
            [`${this.answers[5]}`," "," "],
            [" "," ",`${this.answers[6]}`],
            [" ",`${this.answers[7]}`," "],
            [" ",`${this.answers[8]}`," "],
            [" ",`${this.answers[9]}`," "],
            [" "," ",`${this.answers[10]}`],
            [" ",`${this.answers[11]}`," "],
            [" ",`${this.answers[12]}`," "],
            [" ",`${this.answers[13]}`," "],
            [`${this.answers[14]}`," "," "]
        ]
        return grid
    }

    userAnswerGridSender(){
        let grid = [
            [`${this.userAnswer[0]}`],
            [`${this.userAnswer[1]}`],
            [`${this.userAnswer[2]}`],
            [`${this.userAnswer[3]}`],
            [`${this.userAnswer[4]}`],
            [`${this.userAnswer[5]}`],
            [`${this.userAnswer[6]}`],
            [`${this.userAnswer[7]}`],
            [`${this.userAnswer[8]}`],
            [`${this.userAnswer[9]}`],
            [`${this.userAnswer[10]}`],
            [`${this.userAnswer[11]}`],
            [`${this.userAnswer[12]}`],
            [`${this.userAnswer[13]}`],
            [`${this.userAnswer[14]}`]
        ]
        return grid
    }


    getUserAnswer() {
        return this.userAnswer;
    }

    getAnswers() {
        return this.answers;
    }

    getScore() {
        return this.score;
    }

    getAccuracy() {
        return this.accuracy;
    }

    setUserAnswer(newAnswer) {
        this.userAnswer = newAnswer;
    }

    setAnswers(newAnswers) {
        this.answers = newAnswers;
    }
    
}