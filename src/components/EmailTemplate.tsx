interface EmailTemplateProps {
    name: string
    email: string
    href: string
}

function EmailTemplate({name, email, href} : EmailTemplateProps) {
    return (
      <div style={{ padding: "12px", backgroundColor: "black", borderRadius: "12px", color: "white" }}>
        <p style={{ fontSize: "20px" }}>
          Hola <span style={{ color: "white" }}>{name}</span>
        </p>
        <p style={{ color: "white" }}>{email}</p>
        <p style={{ fontSize: "18px" }}>Por favor verifica tu cuenta!</p>
        <a href={href} style={{ color: "#48e" }}>
          Click aquí!
        </a>
      </div>
    );
}

export default EmailTemplate;