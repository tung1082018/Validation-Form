interface Rule {
    selector: string;
    test: (value: string) => string | undefined;
}

interface ValidatorOptions {
    form: string;
    errorSelector: string;
    rules: Rule[];
}

function Validator(options: ValidatorOptions) {
    function validate(inputElement: HTMLInputElement, rule: Rule) {
        const errorElement = inputElement.parentElement!.querySelector(options.errorSelector)!;
        const errorMessage = rule.test(inputElement.value);

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            inputElement.parentElement!.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            inputElement.parentElement!.classList.remove('invalid');
        }
    }

    const formElement = document.querySelector(options.form);

    if (formElement) {
        options.rules.forEach((rule) => {
            const inputElement = formElement.querySelector(rule.selector) as HTMLInputElement;

            inputElement.onblur = () => {
                validate(inputElement, rule);
            };

            inputElement.oninput = () => {
                const errorElement = inputElement.parentElement!.querySelector(options.errorSelector)!;
                errorElement.textContent = '';
                inputElement.parentElement!.classList.remove('invalid');
            };
        });
    }
}

Validator.isRequired = (selector: string) => {
    return {
        selector: selector,
        test: (value: string) => {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
};

Validator.isEmail = (selector: string) => {
    return {
        selector: selector,
        test: (value: string) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là Email';
        }
    };
};

Validator.minLength = (selector: string, min: number) => {
    return {
        selector: selector,
        test: (value: string) => {
            return value.length >= min ? undefined : `Yêu cầu nhập ít nhất ${min} kí tự`;
        }
    };
};

// Example usage
Validator({
    form: '#form-1',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6)
    ]
});
