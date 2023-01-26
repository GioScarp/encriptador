function validateInput(text){
    const isAcent = text.search(/[\u00C0-\u017F]/) !== -1;
    const isPunctuation = text.search(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) !== -1;
    const isCapital = text.search(/[A-Z]/) !== -1;
    const isEmpty = text == "";

    if (isAcent || isPunctuation || isCapital || isEmpty){
        return null;
    }

    return text;
}

function btnEncrypt(){
    let textArea = document.getElementById("miTextArea");
    let textToEncrypt = validateInput(textArea.value);
    if(textToEncrypt == null){
        notify({
            title : "Oops!",
            text : "Solo se permiten letras minusculas y sin acento",
            icon : "error",
        })
        return null;
    }

    let textEncrypt = textToEncrypt.replace(/e/g, "enter");
    textEncrypt = textEncrypt.replace(/i/g, "imes");
    textEncrypt = textEncrypt.replace(/a/g, "ai");
    textEncrypt = textEncrypt.replace(/o/g, "ober");
    textEncrypt = textEncrypt.replace(/u/g, "ufat");
    textArea.value = "";
    showOutput(textEncrypt);
    
}

function btnDecrypt(){
    let textArea = document.getElementById("miTextArea");
    let textToEncrypt = validateInput(textArea.value);
    if(textToEncrypt == null){
        notify({
            title : "Oops!",
            text : "Solo se permiten letras minusculas y sin acento",
            icon : "error",
        })
        return null;
    }

    if(!(textToEncrypt.includes("enter") || textToEncrypt.includes("imes") || textToEncrypt.includes("ai") || textToEncrypt.includes("ober") || textToEncrypt.includes("ufat"))){
        textArea.value = "";
        notFound();
        return null;
    }

    let textEncrypt = textToEncrypt.replace(/enter/g, "e");
    textEncrypt = textEncrypt.replace(/imes/g, "i");
    textEncrypt = textEncrypt.replace(/ai/g, "a");
    textEncrypt = textEncrypt.replace(/ober/g, "o");
    textEncrypt = textEncrypt.replace(/ufat/g, "u");
    textArea.value = "";
    showOutput(textEncrypt);

}

function showOutput(message){
    document.getElementById("ocultar-img").style.display = "none";
    document.getElementById("ocultar-text").style.display = "none";
    let textArea = document.getElementById("outputTextArea");
    textArea.style.display = "block";
    textArea.value = message;
    textArea.disabled = true;
}

function notFound(){
    document.getElementById("ocultar-img").style.display = "block";
    document.getElementById("ocultar-text").style.display = "block";
    document.getElementById("outputTextArea").style.display = "none";
}

function notify(jsonData){
    Swal.fire({
        title: jsonData.title,
        text: jsonData.text,
        icon: jsonData.icon,
        iconColor: '#b9ab9c',
        background: '#E3E0DE',
        confirmButtonColor: '#b9ab9c',
      });    
}

function copiar(){
  let copyText = document.getElementById("outputTextArea");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // for mobile devices

  navigator.clipboard.writeText(copyText.value);

  notify({
    title : "Perfecto!",
    text : "Se ha copiado el texto correctamente",
    icon : "success",
})
}

