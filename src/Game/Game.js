import React, { Component } from 'react';
import './Game.css';

class Game extends Component {

    startSize = 10;
    letters = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'HA',
        'UV',
        'MN',
        'EF',
        'WV',
        'GC'
    ];
    myTimer;

    constructor() {
        super();
        this.state = {
            level: 1,
            canClick: true,
            showRestart: false,
            complexity: 0,
            points: 0,
            timer: 10,
            alertClass: '',
            game: []
        };
        this.generateGame = this.generateGame.bind(this);
        this.clickRightAnswer = this.clickRightAnswer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.showRestart = this.showRestart.bind(this);
    }

    componentWillMount() {
        this.setState({
            game: this.generateGame()
        });
    }

    getLetters() {
        const result = { base: undefined, diff: undefined };
        const pickOne = () => {
            let used = result.base ? result.base : undefined;
            const xpos = Math.floor(Math.random() * this.letters[this.state.complexity].length);
            const picked = this.letters[this.state.complexity][xpos];
            if (used !== picked) { return picked; }
            else {
                return pickOne();
            }
        };
        if (this.letters[this.state.complexity].length === 2) {
            result.base = this.letters[this.state.complexity][0];
            result.diff = this.letters[this.state.complexity][1];
        } else {
            result.base = pickOne();
            result.diff = pickOne();
        }
        return result;
    }

    clickRightAnswer(e) {
        e.preventDefault();
        clearInterval(this.myTimer);
        if (this.state.canClick) {
            const newLevel = this.state.level + 1;
            const newComplexity = this.state.complexity >= 6 ? 0 : this.state.complexity + 1;
            this.intialState(newLevel, newComplexity, this.state.points + this.state.timer);
            this.startTimer();
        }
    }

    intialState(newLevel, newComplexity, points) {
        this.setState({
            level: newLevel,
            complexity: newComplexity,
            showRestart: false,
            points: points,
            canClick: true,
            timer: 10,
            game: this.generateGame(),
            alertClass: ''
        });
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        this.myTimer = setInterval(() => {
            if (this.state.timer === 0) {
                clearInterval(this.myTimer);
                this.setState({ canClick: false, alertClass: 'mis-fail' });
                setTimeout(() => {
                    this.setState({ showRestart: true, alertClass: 'mis-over' });
                }, 3000);
            } else {
                this.setState({ timer: this.state.timer - 1 });
                if (this.state.timer <= 5) {
                    this.setState({ alertClass: 'mis-alert' });
                }
            }
        }, 1000);
    }

    generateGame() {
        let rows = [];
        let size = this.state.level + this.startSize;
        let pair = this.getLetters();
        const diffY = Math.floor(Math.random() * size);
        const diffX = Math.floor(Math.random() * (size * 2));
        for (let r = 0; r < size; r++) {
            const row = [];
            for (let c = 0; c < size * 2; c++) {
                if (r !== diffY || c !== diffX) {
                    row.push(<span key={`${r}${c}`}>{pair.base}</span>);
                } else {
                    row.push(<span key={`${r}${c}`} className="mis-right-answer" onClick={this.clickRightAnswer}>{pair.diff}</span>);
                }
            }
            rows.push(<div key={`${r}`} className='mis-row'>{row}</div>);
        }
        return rows;
    }

    showRestart() {
        if (!this.state.showRestart) {
            return null;
        }
        const restartAll = () => {
            this.setState({ 
                level: 1,
                complexity: 1,
                showRestart: false, 
                alertClass: '' 
            });
            this.intialState(1, 1, 0);
            this.startTimer();
        };
        return (
            <button onClick={restartAll}>Try again!</button>
        );
    }

    render() {
        return (
            <div className="Game">
                {this.state.timer} seconds left / {this.state.points} points
                <br />
                <br />
                <span className={this.state.alertClass}>
                    {this.state.game}
                </span>
                {this.showRestart()}
            </div>
        );
    }
}

export default Game;
