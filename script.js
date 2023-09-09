// Tao 1 doi tuong validator
function Validator(options) {

    
    function validate(inputElement, rule) {
        
        var errorrElement = inputElement.parentElement.querySelector(options.errorrSelector)
        var errorrMessage = rule.test(inputElement.value);
            if (errorrMessage) {
                errorrElement.innerText = errorrMessage;
                inputElement.parentElement.classList.add('invalid');
            }
            else {
                errorrElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            }
    }

    //  Lay element cua form can validate
    var formElement = document.querySelector(options.form);

    if(formElement) {
        options.rules.forEach((rule) => {
        
            // Luu lai cac rule cho moi input
             
        var inputElement = formElement.querySelector(rule.selector);
      
        
        //xu ly truong hop blur
        inputElement.onblur = () => {
            
            validate(inputElement, rule);
        }

        //xu ly truong hop nhap vao input
        inputElement.oninput = () => {
            var errorrElement = inputElement.parentElement.querySelector(options.errorrSelector)
            errorrElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
       })  
    }
}


Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
             return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email'  
        }
    }
}

Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value.length >= min ? undefined : message || `Yêu cầu nhập ít nhất ${min} kí tự`;

        }
    }
}

Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return { 
        selector: selector,
        test: (value) => {
            return value == getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

/**
 * Đoạn mã script.js mô tả một thư viện Validator được tạo ra để thực hiện việc kiểm tra dữ liệu nhập vào trong form. 
 Đây là cách cơ bản để thực hiện xác thực dữ liệu trong form. Dưới đây là mô tả cách thư viện Validator hoạt động:

Đầu tiên, thư viện Validator nhận một đối tượng options chứa thông tin cấu hình và các quy tắc kiểm tra.

Trong hàm validate(inputElement, rule), thư viện sẽ kiểm tra dữ liệu trong inputElement bằng cách áp dụng quy tắc rule. 
Nếu có lỗi, thư viện sẽ hiển thị thông báo lỗi và thêm class invalid vào phần tử cha của inputElement. 
Nếu không có lỗi, thư viện sẽ xóa thông báo lỗi và class invalid.

Thư viện tìm phần tử form cần kiểm tra bằng cách sử dụng document.querySelector(options.form).

Với mỗi quy tắc trong options.rules, thư viện lắng nghe sự kiện blur (khi người dùng thoát khỏi ô input) và sự kiện input (khi người dùng nhập vào ô input)
trên từng inputElement.

Khi người dùng rời khỏi ô input (sự kiện blur), thư viện sử dụng hàm validate để kiểm tra dữ liệu và hiển thị thông báo lỗi nếu cần.

Khi người dùng nhập vào ô input (sự kiện input), thư viện xóa thông báo lỗi và class invalid nếu có.

Các hàm isRequired, isEmail, và minLength định nghĩa các quy tắc kiểm tra dữ liệu cơ bản, tùy thuộc vào loại kiểm tra. 
Mỗi hàm này trả về một đối tượng chứa thông tin quy tắc kiểm tra, bao gồm cả selector và hàm kiểm tra.

Ví dụ, trong đoạn mã script.js, hàm Validator.isRequired định nghĩa một quy tắc yêu cầu nhập dữ liệu và hàm Validator.isEmail định nghĩa một quy tắc kiểm tra
định dạng email.

Thư viện Validator này giúp bạn kiểm tra và xác thực dữ liệu trong các ô input của form một cách dễ dàng.
 */
