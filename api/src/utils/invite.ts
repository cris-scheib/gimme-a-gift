import nodemailer from "nodemailer";

class InviteService {
  sendInvite = (sendTo: string, listName: string, listId: string, organizersList: Array<string>) => {
    const sender = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth:{
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const senderMail = {
      from: process.env.MAIL_ADDRESS,
      to: sendTo,
      subject: "Convite - Gimme a Gift",
      html: `
        <h4>Olá ${sendTo},</h4>
        <p>Você está sendo convidado a se juntar à lista de presente <strong>${listName.toUpperCase()}</strong>
          para celebrar com as pessoas que tornam este evento tão especial!</p>
        <p>Além da chance de aproveitar com as pessoas que estarão presentes no evento,
          você terá a oportunidade de ser mais assertivo na hora de dar aquele presente especial!</p>
        <p>Os organizadores do evento são:</p>
        ${organizersList ? `<ul>
          ${organizersList.map((organizer) => {
            return `<li>${organizer}</li>`;
          })}
        </ul>` : ''}
        <p>Nós da empresa Gimme a Gift juntamente com os organizadores contamos a sua participação!</p>

        <a href="http://177.44.248.67/lista-de-presentes/${listId}"
          style="background-color: #d78db3; border: none; color: white; border-radius: 5px;
          padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
          Acessar lista
        </a>
      `
    };

    sender.sendMail(senderMail, function(error){
      if (error) {
        console.log(error);
      } else {
        console.log('Convite enviado por e-mail.');
      }
    });
  };
}

export default InviteService;
