export const ETRA_LOGO_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/etra-logo.png`
  : 'https://etra-creators.vercel.app/etra-logo.png'

export const etraLogoHtml = `<img
    src="${ETRA_LOGO_URL}"
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
    src="${ETRA_LOGO_URL}"
    alt="إترا للتمكين التقني"
    width="120"
    height="40"
    border="0"
    style="display:block;outline:none;border:none;text-decoration:none;max-width:120px;height:auto;filter:brightness(0) invert(1);"
  /><!--[if !mso]><!-->
  <div style="display:none;font-family:'Courier New',monospace;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:6px;mso-hide:all;">ETRA</div>
  <!--<![endif]-->`
