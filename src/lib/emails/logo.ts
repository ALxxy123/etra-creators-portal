import path from 'node:path'
import type { Attachment } from 'nodemailer/lib/mailer'

export const ETRA_LOGO_CID = 'etra-logo@etra'
export const ETRA_LOGO_SRC = `cid:${ETRA_LOGO_CID}`

export const etraLogoAttachment: Attachment = {
  filename: 'etra-logo.png',
  path: path.join(process.cwd(), 'public', 'etra-logo.png'),
  cid: ETRA_LOGO_CID,
  contentType: 'image/png',
}

export const etraLogoHtml = `<img
    src="${ETRA_LOGO_SRC}"
    alt="إترا للتمكين التقني"
    width="120"
    height="40"
    border="0"
    style="display:block;outline:none;border:none;text-decoration:none;max-width:120px;height:auto;"
  /><!--[if !mso]><!-->
  <div style="display:none;font-family:'Courier New',monospace;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:6px;mso-hide:all;">ETRA</div>
  <!--<![endif]-->`

// Use for dark/purple header backgrounds — makes logo fully white
export const etraLogoWhiteHtml = `<img
    src="${ETRA_LOGO_SRC}"
    alt="إترا للتمكين التقني"
    width="120"
    height="40"
    border="0"
    style="display:block;outline:none;border:none;text-decoration:none;max-width:120px;height:auto;filter:brightness(0) invert(1);"
  /><!--[if !mso]><!-->
  <div style="display:none;font-family:'Courier New',monospace;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:6px;mso-hide:all;">ETRA</div>
  <!--<![endif]-->`
