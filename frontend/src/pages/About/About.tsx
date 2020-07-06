import React from 'react'
import classes from './About.module.css'
import linkedinImg from '../../assets/linkedin.svg'
import githubImg from '../../assets/github.png'

const about = (props) => {
    return (
        <div className={classes.About}>
            <h1>Sobre</h1>
            <div className={classes.AboutCard}>
                <h2>
                    Este é um projeto básico que simula um e-commerce. <br />O intuito deste projeto é apenas
                    desenvolver e melhorar minhas habilidades no desenvolvimento de um software. <br /> <br />
                    Para qualquer sugestão de melhoria, dúvida ou correção de erro pode entrar em contato.
                </h2>
                <div className={classes.Linkedin}>
                    <img src={linkedinImg} alt="linkedin" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/josethiago/">
                        linkedin.com/in/josethiago
                    </a>
                </div>
                <div className={classes.Github}>
                <img src={githubImg} alt="github" />
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/thiaguin">
                        github.com/thiaguin
                    </a>
                </div>
            </div>
        </div>
    )
}

export default about
