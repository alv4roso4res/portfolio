import {
  githubIcon,
  instagramIcon,
  cakeIcon,
  lessonplansIcon,
  linkedinIcon,
  resumeIcon,
  freelanceIcon,
} from '../scripts/icons';

export function renderHome(): string {
  return `
    <main class="container">
      <section class="content">
        <h1 class="title shake-text">Alvaro | Web Developer</h1>

        <p class="intro shake-text">
          Oi, me chamo Alvaro Paiva, desenvolvedor web com foco em backend e automação, do Rio de Janeiro - Brasil.
        </p>

        <div class="groups">

          <div class="group">
            <h2 class="group-title shake-text">Você me encontra em:</h2>
            <ul class="links">
              <li>
                <a class="link" href="https://github.com/alv4roso4res" target="_blank" rel="noopener noreferrer">
                  <span class="label shake-text">github</span>
                  <span class="icon">${githubIcon()}</span>
                </a>
              </li>
              <li>
                <a class="link" href="https://instagram.com/1alvaropaiva" target="_blank" rel="noopener noreferrer">
                  <span class="label shake-text">instagram</span>
                  <span class="icon">${instagramIcon()}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="group">
            <h2 class="group-title shake-text">Alguns dos meus projetos:</h2>
            <ul class="links">
              <li>
                <a class="link" href="https://anajulia-niver.vercel.app/" target="_blank">
                  <span class="label shake-text">Ana Júlia - 1 aninho</span>
                  <span class="icon">${cakeIcon()}</span>
                </a>
              </li>
              <li>
                <a class="link" href="https://lessonplans.vercel.app/" target="_blank">
                  <span class="label shake-text">Gerador de Planos de Aula</span>
                  <span class="icon">${lessonplansIcon()}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="group">
            <h2 class="group-title shake-text">Para trabalho:</h2>
            <ul class="links">
              <li>
                <a class="link" href="https://www.linkedin.com/in/1alvaropaiva" target="_blank">
                  <span class="label shake-text">linkedin</span>
                  <span class="icon">${linkedinIcon()}</span>
                </a>
              </li>
              <li>
                <a class="link" href="/CV_AlvaroPaiva.pdf" download>
                  <span class="label shake-text">resume</span>
                  <span class="icon">${resumeIcon()}</span>
                </a>
              </li>
              <li>
                <a class="link" href="/contact" data-route="contact">
                  <span class="label shake-text">freelance | projetos</span>
                  <span class="icon">${freelanceIcon()}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </main>
  `;
}
