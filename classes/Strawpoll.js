"use strict";

const request = require('request');

const DUPCHECK_NORMAL = "normal";
const DUPCHECK_PERMISSIVE = "permissive";
const DUPCHECK_DISABLED = "disabled";

const STRAWPOLL_URL = 'https://www.strawpoll.me';
const STRAWPOLL_API = `${STRAWPOLL_URL}/api/v2/polls`;

class Strawpoll {

    /**
     * @param {string} title
     * @param {array} options
     * @param {boolean} multi
     * @param {string} dupcheck
     * @param {boolean} captcha
     */
    constructor(title, options, multi, dupcheck, captcha) {
        this._title = title;
        this._options = options;
        this._multi = multi;
        this._dupcheck = dupcheck;
        this._captcha = captcha;

        this._id = null;
        this._votes = null;
    };

    static get DUPCHECK_NORMAL() {
        return DUPCHECK_NORMAL;
    }

    static get DUPCHECK_PERMISSIVE() {
        return DUPCHECK_PERMISSIVE;
    }

    static get DUPCHECK_DISABLED() {
        return DUPCHECK_DISABLED;
    }

    static get STRAWPOLL_URL() {
        return STRAWPOLL_URL;
    }

    static get STRAWPOLL_API() {
        return STRAWPOLL_API
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get multi() {
        return this._multi;
    }

    set multi(value) {
        this._multi = value;
    }

    get dupcheck() {
        return this._dupcheck;
    }

    set dupcheck(value) {
        this._dupcheck = value;
    }

    get captcha() {
        return this._captcha;
    }

    set captcha(value) {
        this._captcha = value;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get votes() {
        return this._votes;
    }

    set votes(value) {
        this._votes = value;
    }

    createPoll() {

        let poll = this;

        return new Promise((fullfill,) => {
            let options = {
                uri: Strawpoll.STRAWPOLL_API,
                method: 'POST',
                json: poll.toJSON()
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    poll.id = body.id;
                    fullfill(poll);
                } else {
                    throw "Error while requesting strawpoll API";
                }
            });
        })
    }

    getVotes() {
        let poll = this;

        if (this._id !== null) {

            return new Promise((fullfill) => {
                let options = {
                    uri: Strawpoll.STRAWPOLL_API + "/" + this._id,
                    method: 'GET',
                    json: true
                };

                console.log(options.uri);

                request(options, (error, response, body) => {
                    if (!error && response.statusCode === 200) {

                        if (typeof poll.title === "undefined") {
                            poll.title = body.title;
                        }
                        if (typeof poll.options === "undefined") {
                            poll.options = body.options;
                        }
                        if (typeof poll.multi === "undefined") {
                            poll.multi = body.multi;
                        }
                        if (typeof poll.dupcheck === "undefined") {
                            poll.dupcheck = body.dupcheck;
                        }
                        if (typeof poll.captcha === "undefined") {
                            poll.captcha = body.captcha;
                        }

                        poll.votes = body.votes;
                        fullfill(poll);
                    } else {
                        throw "Error while requesting strawpoll API";
                    }
                });
            });
        }
    }

    toJSON() {
        return {
            title: this.title,
            multi: this.multi,
            dupcheck: this.dupcheck,
            captcha: this.captcha,
            options: this.options,
            votes: this.votes,
        }
    }
}

module.exports = Strawpoll;