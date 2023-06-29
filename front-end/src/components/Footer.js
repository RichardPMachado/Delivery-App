import logoGaze from '../images/logoGaze.svg';

import '../styles/components/Footer.css';

import instagramImage from '../images/instagramImage.svg';
import faceboockImage from '../images/faceboockImage.svg';
import twitterImage from '../images/twitterImage.svg';
import youtubeImage from '../images/youtubeImage.svg';

function Footer() {
  return (
    <footer>
      <div className="footer-div-alignment">
        <div>
          <img
            className="logo-gaze"
            alt="logo da empresa Gaze"
            src={ logoGaze }
          />

          <p className="footer-your-favorite-store">
            a sua loja de cervejas favorita!
          </p>
          <span className="footer-contact">
            contato@gaze.com.br
          </span>
        </div>

        <div className="footer-alignment">
          <div className="footer-solutions">
            <h4> Soluções </h4>
            <p> Faça parte </p>
            <p> Parceiras </p>
          </div>

          <div className="footer-institutional">
            <h4>Institucional</h4>
            <p>Sobre nós</p>
            <p>Contato</p>
          </div>

          <div className="footer-help-center">
            <h4>
              Central de ajuda
            </h4>

            <p>
              Política de privacidade
            </p>

            <p>
              Central de ajuda
            </p>
          </div>
        </div>
      </div>

      <div className="footer-copyright-icon">
        <span className="footer-copyright">
          © Copyright 2022 Gaze. Todos os direitos reservados
        </span>

        <div className="nav-social-media">
          <img
            className="instagram-image"
            alt="imagem do icone do instagem"
            src={ instagramImage }
          />

          <img
            className="faceboock-image"
            alt="imagem do icone do faceboock"
            src={ faceboockImage }
          />

          <img
            className="twitter-image"
            alt="imagem do icone do twitter"
            src={ twitterImage }
          />

          <img
            className="youtube-image"
            alt="imagem do youtube"
            src={ youtubeImage }
          />
        </div>
      </div>

    </footer>
  );
}

export default Footer;
