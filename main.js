function Validator(options) {
    
    function validate(inputElement, rule)  {
        var errorrMessage = rule.test(inputElement.value);
        var errorrElement = inputElement.parentElement.querySelector(options.errorrSelector);
                
            if (errorrMessage) {
                errorrElement.innerHTML = errorrMessage;
                inputElement.parentElement.classList.add('invalid');
            }
            else {
                errorrElement.innerHTML = '';
                inputElement.parentElement.classList.remove('invalid');
            }

        }
    

    var formElement = document.querySelector(options.form);
    
    if(formElement) {
        
        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector);
            inputElement.onblur = () => {validate(inputElement, rule);}
            
            inputElement.oninput = () => {
                var errorrElement = inputElement.parentElement.querySelector(options.errorrSelector)
                errorrElement.innerHTML = '';
                inputElement.parentElement.classList.remove('invalid');
            }
         });
    }

}

Validator.isRequired = (selector) => {
   return {
    selector: selector,
    test: (value) => {
        return value.trim() ? undefined : 'vui long nhap truong nay'
    }
   }
}

Validator.isEmail = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'truong nay phai la email'       
        }
    }
}

Validator.minLength = (selector, min) => {
    return {
        selector: selector,
        test: (value) => {
            return value.length >= min ? undefined : `phai lon hon ${min} ky tu`       
        }
    }
}

Validator.isConfirmed = (selector, getConfirmValue) => {
    return { 
        selector: selector,
        test: (value) => {
            return value == getConfirmValue() ? undefined : 'Gia tri nhap vao khong trung khop';
        }
    }
}