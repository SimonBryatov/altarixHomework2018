import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import ApiStore from '../ApiStore';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: ($validator) => {
      // here we can access the `validatorjs` instance
      var messages = $validator.getMessages('en');
      // $validator.setAttributeNames({ "Реальное число свободных мест в зоне 1": 'Поле 1',
      // 'Реальное число свободных мест в зоне 2': "Поле 2" });
      
      messages.integer = '":attribute" должно иметь целочисленное значение!';
      messages.required_without = 'without';
      $validator.setMessages('en', messages);
    },
  }
};

const fields = [{
    name: 'login',
    label: 'Логин',
    rules: 'required',
    initial: 'Vasya',
  }, 
{
    name: 'password',
    label: 'Пароль',
    rules: 'required',
    initial: 'Cool'
}]

  const hooks = {
    onSuccess(form) {
      ApiStore.login(form.values());
    },
    onError(form) {
      // get all form errors
      let errors = form.errors();
      if (errors.zone1 === "without" || errors.zone2 === "without") 
      {
      form.invalidate("Хотя бы одно поле должно быть объявлено")
      } else {
      form.invalidate("Поля должны иметь целочисленное значение")
      }
      // console.log('All form errors', form.get());
    },
    onSubmit(form) {
      console.log(form.values())
    }
  }

  const options = {
    showErrorsOnSubmit: true,
    // validateOnChange: true
  }

  const authForm = new MobxReactForm({ fields }, { plugins, hooks, options });

  export default authForm
