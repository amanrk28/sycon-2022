/* eslint-disable max-len */
module.exports = function renderHtml({ fullName, qr }) {
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <style>
          table, td, div, h1, p {font-family: Arial, sans-serif;}
      </style>
  </head>
  <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
              <td align="center" style="padding:0;">
                <table role="presentation" style="width:100%;max-width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                    <tr>
                        <td align="center" style="padding:40px 0 0 0;background:#ffffff;">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sycon2022-46644.appspot.com/o/SYConLogo.png?alt=media&token=0191a4f6-d717-4dd5-bd42-d83f463df827" alt="SYCon 2022" width="200" style="height:auto;display:block;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 30px 42px 30px;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                    <td style="padding:0 0 36px 0;color:#153643;">
                                        <h1 style="font-size:24px;margin:0 0 20px 0;text-align:center; font-family:Arial,sans-serif;">Registration Successful!!</h1>
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> Hey ${fullName}!</p>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                    <td align="center" style="padding:32px 0;">
                        <img src="${qr}" alt="QR Code" style="border: 1px solid #ddd; border-radius:8px;" />
                    </td>
                    </tr>
                      <tr>
                          <td style="padding:20px;background:#ee4c50;">
                              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                  <tr>
                                      <td style="padding:0;width:50%;" align="left">
                                          <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                              &reg; SSN SYCon 2022<br/>
                                          </p>
                                      </td>
                                      <td style="padding:0;width:50%;" align="right">
                                          <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                              <tr>
                                                  <td style="padding:0 0 0 10px;width:38px;">
                                                      <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                                  </td>
                                                  <td style="padding:0 0 0 10px;width:38px;">
                                                      <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`;
};
