import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import './App.css'
import CLlogo from '/src/assets/logo.svg'
import './main.min.css'
import Footer from '/src/Footer.jsx';

const Insurance = () => {
    const [formData, setFormData] = useState({
        policyholder: {
            name: '',
            age: '',
            gender: '',
            smoker: false,
            region: '',
            history_of_claims: '',
            previous_claims_amount: ''
        },
        insurance_policy: {
            policy_id: '',
            type: '',
            coverage_amount: '',
            premium: '',
            start_date: '',
            end_date: ''
        },
        underwriting_data: {
            number_of_claims_this_year: '',
            days_between_policy_and_first_claim: '',
            duplicate_contact_info_found: false,
            vin_suspect: false,
            claim_amount: '',
            loss_ratio: '',
            behavior_pattern: ''
        },
        financial_metrics: {
            total_premium_collected: '',
            total_claims_paid: '',
            active_policies: '',
            technical_reserves: '',
            eligible_own_funds: '',
            scr: '',
            solvency_ratio: '',
            financial_assets: '',
            liabilities: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nameParts = name.split('.'); // Разделение по точке для вложенных данных
        setFormData(prevData => {
            const newData = { ...prevData };
            let current = newData;
            nameParts.forEach((part, index) => {
                if (index === nameParts.length - 1) {
                    current[part] = value;
                } else {
                    current = current[part];
                }
            });
            return newData;
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        const nameParts = name.split('.'); // Разделение по точке для вложенных данных
        setFormData(prevData => {
            const newData = { ...prevData };
            let current = newData;
            nameParts.forEach((part, index) => {
                if (index === nameParts.length - 1) {
                    current[part] = checked;
                } else {
                    current = current[part];
                }
            });
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://85.174.194.25:8000/api/insurance_form/', formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '../src/min_main.js';
        script.async = true;
        const mobilescript = document.createElement('script');
        mobilescript.src = '../src/custom.js';
        mobilescript.async = true;
        document.body.appendChild(mobilescript);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
            document.body.removeChild(mobilescript);
        };
    }, []);
    return (
        <div>
            <div className="website-wrapper">
                <header className="header">
                    <div className="container container--fluid">
                        <div className="logotype">
                            <a href="/" className="logotype__link borderless">
                                <div className="logotype__link borderless">
                                    <img src={CLlogo} width="32" height="32" alt="logotype"/>
                                </div>
                            </a>
                        </div>
                        <nav className="menu">
                            <div className="menu__item">
                                <a href="/contacts/" className="menu__link">
                                    Контакты
                                </a>
                            </div>
                            <div className="menu__item">
                                <a href="/projects/" className="menu__link">
                                    Услуги
                                </a>
                            </div>
                        </nav>

                        <div className="contacts">
                            <a target="_blank" title="Телеграм" className="contacts__round-bt contacts__round-bt--tg"
                               href="https://t.me/dieserpaniker">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.66481 14.2746L15.8952 7.74934C16.2125 7.4677 15.8259 7.33036 15.4047 7.58582L6.48107 13.2156L2.62657 12.0125C1.79416 11.7577 1.78819 11.1857 2.81345 10.7745L17.8336 4.98276C18.5196 4.67131 19.1817 5.14752 18.9198 6.19749L16.3619 18.2514C16.1833 19.108 15.6657 19.3128 14.9486 18.9172L11.0521 16.0383L9.17916 17.8595C9.17326 17.8652 9.16738 17.871 9.16154 17.8767C8.95206 18.0806 8.77875 18.2493 8.39951 18.2493L8.66481 14.2746Z"
                                        fill="black"/>
                                </svg>
                            </a>
                            <a target="_blank" title="Ватсап" className="contacts__round-bt contacts__round-bt--wa"
                               href="https://wa.me/79628774982">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12.1639 2.64282C14.6446 2.6438 16.9731 3.60955 18.7239 5.36243C20.4747 7.11527 21.4384 9.44523 21.4375 11.9231C21.4355 17.0362 17.2749 21.1965 12.164 21.1965H12.1602C10.6081 21.196 9.08306 20.8065 7.72854 20.0677L2.8125 21.3573L4.12811 16.5519C3.31656 15.1455 2.88956 13.5501 2.89023 11.9157C2.89227 6.80263 7.05239 2.64282 12.1639 2.64282ZM14.8085 13.1038C15.0209 13.1811 16.1601 13.7417 16.3918 13.8576C16.437 13.8802 16.4792 13.9006 16.5183 13.9195C16.68 13.9977 16.7893 14.0505 16.8359 14.1283C16.8938 14.2249 16.8938 14.6888 16.7007 15.2301C16.5076 15.7714 15.5819 16.2654 15.1367 16.3319C14.7375 16.3916 14.2324 16.4165 13.6772 16.2401C13.3408 16.1333 12.9091 15.9907 12.3563 15.752C10.184 14.814 8.716 12.7085 8.43857 12.3107C8.41914 12.2828 8.40555 12.2633 8.39797 12.2532L8.39605 12.2506C8.27323 12.0867 7.45178 10.9906 7.45178 9.8562C7.45178 8.78886 7.97604 8.22943 8.21741 7.97187C8.23395 7.95422 8.24917 7.93798 8.26279 7.9231C8.47516 7.69116 8.72621 7.63318 8.88069 7.63318C9.03512 7.63318 9.18977 7.6346 9.32477 7.64132C9.34144 7.64216 9.35879 7.64207 9.37673 7.64197C9.51177 7.64122 9.68009 7.6403 9.84613 8.03906C9.90973 8.19191 10.0027 8.41819 10.1008 8.65707C10.3005 9.14334 10.5217 9.68185 10.5606 9.75962C10.6185 9.87558 10.6571 10.0109 10.5799 10.1656C10.5682 10.1888 10.5575 10.2107 10.5473 10.2317C10.4893 10.3501 10.4466 10.4372 10.3481 10.5521C10.3095 10.5973 10.2695 10.646 10.2295 10.6946C10.1498 10.7918 10.07 10.8889 10.0006 10.9581C9.88459 11.0736 9.76382 11.199 9.89895 11.431C10.0341 11.663 10.4992 12.4217 11.188 13.0361C11.9284 13.6966 12.5719 13.9757 12.8982 14.1173C12.9619 14.1449 13.0136 14.1673 13.0514 14.1863C13.2831 14.3023 13.4183 14.2828 13.5534 14.1283C13.6886 13.9736 14.1327 13.4517 14.2871 13.2197C14.4416 12.9878 14.5961 13.0264 14.8085 13.1038Z"
                                          fill="black"/>
                                </svg>
                            </a>

                            <a title="Меню" className="contacts__round-bt contacts__menu-bt" href="#">
                                <svg className="ico-burger" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M2 8.5C2 7.94772 2.44772 7.5 3 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H3C2.44772 9.5 2 9.05228 2 8.5ZM2 15.5C2 14.9477 2.44772 14.5 3 14.5H21C21.5523 14.5 22 14.9477 22 15.5C22 16.0523 21.5523 16.5 21 16.5H3C2.44772 16.5 2 16.0523 2 15.5Z"
                                          fill="black"/>
                                </svg>
                                <svg className="ico-close" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                                          fill="black"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </header>
                <div className="menu-mobile">
                    <div className="menu-mobile__content">
                        <nav className="menu-mobile__menu">
                            <div className="menu-mobile__item">
                                <a href="/projects/" className="menu-mobile__link">
                                    Проекты
                                </a>
                            </div>
                            <div className="menu-mobile__item">
                                <a href="/contacts/" className="menu-mobile__link">
                                    Контакты
                                </a>
                            </div>
                            <div className="menu-mobile__item">
                                <a href="/order/" className="menu-mobile__link">
                                    Заказать
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div className="menu-mobile__overlay"></div>
                </div>

                <main className="website-workarea js-website-workarea">
                    <div className="page">
                        <div className="container">
                            <header className="page__header">
                                <h1>Заполните данные для оценки страхования с riskAI</h1>
                            </header>
                            <div className="page__content">
                                <div className="application js-message-container">
                                    <form onSubmit={handleSubmit}>
                                        <input name="admin_mode" type="hidden" value=""/>
                                        <input type="hidden" name="nc_token" value="1d9bd8c339faf0fcf1226a92ba515f58"/>
                                        <input name="catalogue" type="hidden" value="1"/>
                                        <input name="cc" type="hidden" value="42"/>
                                        <input name="sub" type="hidden" value="38"/>
                                        <input name="nc_ctpl" type="hidden" value="2207"/>
                                        <input name="posting" type="hidden" value="1"/>
                                        <input name="curPos" type="hidden" value="0"/>
                                        <input name="f_Parent_Message_ID" type="hidden" value="0"/>
                                        <input type="hidden" name="f_Checked" value="1"/>
                                        <div className="default-form__section">
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="text" name="policyholder.name" placeholder="ФИО"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="policyholder.age" placeholder="Возраст"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <select name="policyholder.gender" onChange={handleChange}>
                                                        <option value="">Пол</option>
                                                        <option value="муж">Мужской</option>
                                                        <option value="жен">Женский</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <label>
                                                        <input type="checkbox" name="policyholder.smoker"
                                                               onChange={handleCheckboxChange}/> Курит?
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="text" name="policyholder.region" placeholder="Регион"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="policyholder.history_of_claims"
                                                           placeholder="Кол-во прошлых заявок" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="policyholder.previous_claims_amount"
                                                           placeholder="Сумма прошлых заявок, ₽"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>

                                            {/* === Страховой полис === */}
                                            <h3>Информация о полисе</h3>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="text" name="insurance_policy.policy_id"
                                                           placeholder="Номер полиса" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="text" name="insurance_policy.type"
                                                           placeholder="Тип страхования (КАСКО и т.д.)"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="insurance_policy.coverage_amount"
                                                           placeholder="Сумма покрытия, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="insurance_policy.premium"
                                                           placeholder="Премия, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="date" name="insurance_policy.start_date"
                                                           placeholder="Дата начала" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="date" name="insurance_policy.end_date"
                                                           placeholder="Дата окончания" onChange={handleChange}/>
                                                </div>
                                            </div>

                                            {/* === Данные андеррайтинга === */}
                                            <h3>Андеррайтинг и мошенничество</h3>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number"
                                                           name="underwriting_data.number_of_claims_this_year"
                                                           placeholder="Заявок в этом году" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number"
                                                           name="underwriting_data.days_between_policy_and_first_claim"
                                                           placeholder="Дней до первой заявки" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <label>
                                                        <input type="checkbox"
                                                               name="underwriting_data.duplicate_contact_info_found"
                                                               onChange={handleCheckboxChange}/> Найден дубликат
                                                        контактов?
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <label>
                                                        <input type="checkbox" name="underwriting_data.vin_suspect"
                                                               onChange={handleCheckboxChange}/> VIN подозрительный?
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="underwriting_data.claim_amount"
                                                           placeholder="Сумма заявки, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" step="0.01" name="underwriting_data.loss_ratio"
                                                           placeholder="Loss ratio (например, 1.35)"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="text" name="underwriting_data.behavior_pattern"
                                                           placeholder="Поведенческий паттерн" onChange={handleChange}/>
                                                </div>
                                            </div>

                                            {/* === Финансовые показатели страховщика === */}
                                            <h3>Финансовая устойчивость</h3>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number"
                                                           name="financial_metrics.total_premium_collected"
                                                           placeholder="Собрано премий, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.total_claims_paid"
                                                           placeholder="Выплачено заявок, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.active_policies"
                                                           placeholder="Активных полисов" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.technical_reserves"
                                                           placeholder="Технические резервы, ₽"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.eligible_own_funds"
                                                           placeholder="Собственные средства, ₽"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.scr"
                                                           placeholder="SCR (требуемый капитал), ₽"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" step="0.01"
                                                           name="financial_metrics.solvency_ratio"
                                                           placeholder="Коэффициент платёжеспособности"
                                                           onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.financial_assets"
                                                           placeholder="Финансовые активы, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="default-form__row">
                                                <div className="input js-input">
                                                    <input type="number" name="financial_metrics.liabilities"
                                                           placeholder="Обязательства, ₽" onChange={handleChange}/>
                                                </div>
                                            </div>
                                </div>

                                <div className="default-form__section">
                                    <div className="default-form__row">
                                        <div className="input  js-input ">
                                            <input className="" type="text" name="f_Company"
                                                   placeholder="Компания" autoComplete="off"/>
                                        </div>
                                    </div>
                                    <div className="default-form__row">
                                        <div className="input  js-input ">
                                            <input className="" type="text" name="f_Name"
                                                   placeholder="Как вас зовут" autoComplete="off"/>
                                        </div>
                                    </div>

                                    <div className="default-form__row">
                                        <div className="default-form__element default-form__element--phone">
                                            <div className="input input--mini js-input ">
                                                <input className="js-input-phone" type="tel" name="f_Phone"
                                                       placeholder="+7 ___ ___ - __ - __" autoComplete="off"
                                                       inputMode="text"/>
                                            </div>
                                        </div>
                                        <div className="default-form__element default-form__element--auto">
                                            <div className="input  js-input ">
                                                <input className="" type="email" name="f_Mail"
                                                       placeholder="Электронная почта" autoComplete="off"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="default-form__section">
                                    <div className="default-form__row">
                                        <button className="button" type="submit">
                                            <span>Отправить</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="default-form-success js-success-message">
                                <div className="default-form-success__content">
                                    <div className="default-form-success__icon">
                                        <svg className="i _success-alt" viewBox="0 0 408 241" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path
                                                    d="M352.849 241H35.0043C33.4651 241 32.2246 239.75 32.2246 238.211C32.2246 236.667 33.4709 235.423 35.0043 235.423H352.849C354.389 235.423 355.629 236.673 355.629 238.211C355.629 239.75 354.383 241 352.849 241Z"
                                                    fill="black"></path>
                                                <path
                                                    d="M303.643 174.86V184.649C303.643 186.372 302.253 187.772 300.53 187.772C298.813 187.772 297.417 186.378 297.417 184.649V174.86C297.417 173.137 298.807 171.737 300.53 171.737C302.253 171.737 303.643 173.137 303.643 174.86Z"
                                                    fill="white"></path>
                                                <path
                                                    d="M300.536 188.343C298.503 188.343 296.849 186.683 296.849 184.644V174.854C296.849 172.815 298.503 171.155 300.536 171.155C302.569 171.155 304.223 172.815 304.223 174.854V184.644C304.217 186.683 302.569 188.343 300.536 188.343ZM300.536 172.313C299.134 172.313 297.997 173.454 297.997 174.86V184.649C297.997 186.055 299.134 187.196 300.536 187.196C301.937 187.196 303.074 186.055 303.074 184.649V174.86C303.068 173.454 301.931 172.313 300.536 172.313Z"
                                                    fill="black"></path>
                                                <path
                                                    d="M134.859 221.081C127.071 221.081 121.776 219.088 119.106 215.164C115.487 209.834 118.095 203.001 118.21 202.713C118.342 202.35 132.005 164.742 137.001 154.325C141.234 145.509 152.519 148.926 152.657 148.966C169.174 154.135 164.717 170.274 164.671 170.435C164.665 170.458 164.654 170.481 164.648 170.504L154.954 192.722L176.341 193.678C176.422 193.684 176.496 193.701 176.565 193.736C176.812 193.857 182.613 196.778 182.613 206.613C182.613 216.627 179.586 219.75 179.46 219.877C179.356 219.975 179.224 220.038 179.081 220.044C178.868 220.056 157.613 221.081 134.859 221.081ZM147.54 149.41C147.212 149.41 146.873 149.422 146.535 149.445C142.486 149.71 139.626 151.519 138.041 154.826C133.067 165.192 119.427 202.741 119.289 203.122C119.261 203.202 116.785 209.702 120.065 214.519C122.506 218.108 127.485 219.929 134.865 219.929C156.258 219.929 176.33 219.019 178.776 218.903C179.328 218.189 181.464 214.882 181.464 206.613C181.464 198.109 176.915 195.24 176.163 194.825L154.069 193.839L138.443 193.142C138.132 193.131 137.891 192.871 137.891 192.566C137.891 192.555 137.891 192.549 137.891 192.543C137.903 192.226 138.178 191.978 138.489 191.99L153.725 192.67L163.58 170.078C163.856 169.081 167.531 154.826 152.318 150.067C152.295 150.061 150.181 149.41 147.54 149.41Z"
                                                    fill="black"></path>
                                                <path
                                                    d="M144.507 237.197C144.358 237.197 144.215 237.14 144.105 237.03C143.996 236.921 143.933 236.777 143.933 236.621V220.505C143.933 220.188 144.192 219.929 144.507 219.929C144.823 219.929 145.082 220.188 145.082 220.505V236.033L211.753 234.852C211.943 228.923 213.625 176.957 213.821 164.615C213.981 154.619 210.605 150.891 208.801 150.315C208.778 150.309 208.75 150.297 208.732 150.286L196.413 144.599C196.39 148.874 195.248 151.542 193.008 152.539C186.983 155.212 175.147 144.363 173.326 142.64C157.326 145.89 152.927 149.894 152.881 149.934C152.651 150.153 152.289 150.142 152.071 149.911C151.853 149.681 151.864 149.318 152.088 149.099C152.272 148.926 156.729 144.795 173.389 141.453C173.573 141.418 173.763 141.47 173.901 141.603C173.935 141.632 177.214 144.789 181.183 147.572C186.306 151.162 190.234 152.51 192.543 151.484C194.472 150.626 195.385 148.01 195.253 143.712C195.248 143.51 195.345 143.326 195.512 143.216C195.678 143.107 195.891 143.089 196.069 143.176L209.18 149.231C209.783 149.439 215.176 151.646 214.969 164.638C214.763 177.678 212.902 234.869 212.885 235.446C212.873 235.751 212.626 235.999 212.322 236.005L144.519 237.209C144.513 237.197 144.513 237.197 144.507 237.197Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M221.281 232.225C221.068 232.225 220.862 232.104 220.764 231.902L212.46 214.789C212.322 214.501 212.437 214.161 212.724 214.017C213.011 213.879 213.355 214 213.493 214.282L221.574 230.94L286.384 208.63L287.275 186.701L236.219 198.265C235.943 198.328 235.662 198.178 235.558 197.913C235.443 197.625 224.21 169.017 217.433 155.783C214.596 150.24 209.686 150.534 209.479 150.545C209.151 150.568 208.887 150.332 208.864 150.015C208.841 149.698 209.077 149.421 209.393 149.398C209.628 149.381 215.262 149.012 218.461 155.258C224.79 167.617 234.972 193.281 236.454 197.031L287.763 185.41C287.941 185.37 288.119 185.416 288.257 185.531C288.395 185.646 288.469 185.819 288.463 185.998L287.527 209.074C287.516 209.31 287.367 209.517 287.143 209.598L221.482 232.202C221.407 232.213 221.344 232.225 221.281 232.225Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M293.54 235.417H182.09C180.637 235.417 179.454 234.236 179.454 232.772C179.454 231.314 180.631 230.127 182.09 230.127H293.54C294.993 230.127 296.176 231.309 296.176 232.772C296.176 234.236 294.993 235.417 293.54 235.417Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M293.54 235.993H182.09C180.321 235.993 178.88 234.547 178.88 232.772C178.88 230.997 180.321 229.551 182.09 229.551H293.54C295.309 229.551 296.751 230.997 296.751 232.772C296.751 234.547 295.309 235.993 293.54 235.993ZM182.09 230.709C180.953 230.709 180.028 231.637 180.028 232.778C180.028 233.919 180.953 234.846 182.09 234.846H293.54C294.678 234.846 295.602 233.919 295.602 232.778C295.602 231.637 294.678 230.709 293.54 230.709H182.09Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M296.349 231.649H219.667C217.508 231.649 215.917 229.626 216.417 227.523L227.346 181.33C227.702 179.821 229.051 178.749 230.596 178.749H307.278C309.437 178.749 311.028 180.772 310.528 182.875L299.599 229.067C299.243 230.583 297.899 231.649 296.349 231.649Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M296.349 232.225H219.667C218.461 232.225 217.341 231.683 216.595 230.732C215.848 229.782 215.578 228.566 215.854 227.391L226.783 181.198C227.202 179.418 228.77 178.173 230.596 178.173H307.278C308.484 178.173 309.604 178.715 310.35 179.665C311.097 180.616 311.367 181.832 311.091 183.007L300.162 229.2C299.737 230.98 298.169 232.225 296.349 232.225ZM230.596 179.325C229.31 179.325 228.201 180.201 227.903 181.463L216.974 227.656C216.778 228.485 216.968 229.35 217.496 230.018C218.025 230.686 218.817 231.072 219.667 231.072H296.349C297.635 231.072 298.744 230.197 299.042 228.935L309.971 182.742C310.166 181.912 309.977 181.048 309.449 180.38C308.92 179.711 308.128 179.325 307.278 179.325H230.596Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M181.458 218.01C181.143 218.01 180.884 217.751 180.884 217.434C180.884 217.117 181.143 216.858 181.458 216.858L202.271 216.846C203.351 216.846 204.23 216.011 204.23 214.991V214.801C204.23 213.775 203.351 212.946 202.271 212.946H196.925C196.609 212.946 196.35 212.686 196.35 212.369C196.35 212.053 196.609 211.793 196.925 211.793H202.271C203.351 211.793 204.23 210.958 204.23 209.938V209.627C204.23 208.601 203.351 207.772 202.271 207.772H197.005C196.689 207.772 196.431 207.512 196.431 207.195C196.431 206.878 196.689 206.619 197.005 206.619H202.271C203.351 206.619 204.23 205.784 204.23 204.764C204.23 203.744 203.351 202.909 202.271 202.909H196.838C196.523 202.909 196.264 202.649 196.264 202.332C196.264 202.015 196.523 201.756 196.838 201.756H202.271C203.351 201.756 204.23 200.921 204.23 199.901V199.745C204.23 198.72 203.351 197.89 202.271 197.89H191.141C190.946 197.89 190.762 197.792 190.659 197.625C190.555 197.458 190.538 197.25 190.619 197.072C190.642 197.02 193.048 191.708 192.221 187.991C191.687 185.589 190.55 184.678 189.671 184.851C188.781 185.018 188.023 186.263 188.304 188.055C189.315 194.531 184.933 197.729 184.743 197.861C184.646 197.93 184.531 197.965 184.41 197.965H179.448C179.132 197.965 178.874 197.706 178.874 197.389C178.874 197.072 179.132 196.813 179.448 196.813H184.221C184.927 196.242 187.988 193.436 187.173 188.227C186.771 185.652 188.051 183.981 189.459 183.716C190.785 183.462 192.594 184.367 193.347 187.743C194.059 190.959 192.686 195.021 192.008 196.738H202.271C203.983 196.738 205.378 198.086 205.378 199.745V199.901C205.378 200.898 204.873 201.785 204.098 202.332C204.873 202.88 205.378 203.767 205.378 204.764C205.378 205.761 204.873 206.648 204.098 207.195C204.873 207.743 205.378 208.63 205.378 209.627V209.938C205.378 210.935 204.873 211.822 204.098 212.369C204.873 212.917 205.378 213.804 205.378 214.801V214.991C205.378 216.651 203.983 217.999 202.271 217.999L181.458 218.01Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M173.504 142.594C173.274 142.594 173.056 142.455 172.97 142.225C172.855 141.931 173.004 141.597 173.297 141.482L176.427 140.266V126.76C176.427 126.443 176.686 126.184 177.002 126.184C177.317 126.184 177.576 126.443 177.576 126.76V140.658C177.576 140.894 177.432 141.107 177.208 141.194L173.717 142.553C173.648 142.582 173.573 142.594 173.504 142.594Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M195.828 144.265C195.742 144.265 195.65 144.247 195.569 144.201L191.813 142.294C191.618 142.196 191.498 142 191.498 141.781V135.305C191.498 134.988 191.756 134.729 192.072 134.729C192.388 134.729 192.646 134.988 192.646 135.305V141.43L196.086 143.181C196.368 143.325 196.483 143.671 196.339 143.954C196.241 144.149 196.04 144.265 195.828 144.265Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M120.743 58.2982C120.582 58.2982 120.421 58.229 120.312 58.1023C120.163 57.9352 120.128 57.6932 120.22 57.4858L125.532 45.5934C125.613 45.4147 125.779 45.288 125.969 45.2592L155.793 40.7131L129.151 38.8808C128.938 38.8635 128.749 38.7368 128.662 38.5409C128.576 38.345 128.605 38.1203 128.737 37.9474L133.504 31.9321C133.636 31.765 133.843 31.6901 134.049 31.7246L179.156 39.5204C179.42 39.5665 179.615 39.7854 179.632 40.0505C179.65 40.3155 179.477 40.5575 179.225 40.6382L120.898 58.2751C120.858 58.2867 120.8 58.2982 120.743 58.2982ZM126.457 46.3482L121.782 56.8059L176.571 40.2406L134.199 32.9173L130.322 37.8091L161.088 39.9237C161.381 39.941 161.611 40.183 161.622 40.4768C161.633 40.7707 161.427 41.0242 161.134 41.0703L126.457 46.3482Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M132.389 45.4378C132.177 45.4378 131.97 45.3168 131.872 45.1151L128.679 38.5582C128.541 38.2701 128.656 37.9244 128.943 37.7861C129.231 37.6478 129.569 37.763 129.713 38.0511L132.906 44.6081C133.044 44.8962 132.929 45.2419 132.642 45.3802C132.562 45.4205 132.475 45.4378 132.389 45.4378Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M136.961 58.2982C136.794 58.2982 136.634 58.229 136.525 58.0965L133.228 54.19C133.021 53.948 133.056 53.585 133.297 53.3776C133.538 53.1702 133.9 53.2047 134.107 53.4467L137.128 57.0306L178.851 39.555C179.144 39.434 179.483 39.5722 179.603 39.8661C179.724 40.1599 179.586 40.4999 179.293 40.6209L137.185 58.2579C137.11 58.2809 137.036 58.2982 136.961 58.2982Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M72.5353 237.197C72.2769 237.197 72.0357 237.019 71.9783 236.754L65.9308 210.589C65.8906 210.416 65.9308 210.238 66.0399 210.099C66.149 209.961 66.3156 209.88 66.4879 209.88H79.8405C80.1564 209.88 80.4148 210.14 80.4148 210.457C80.4148 210.773 80.1564 211.033 79.8405 211.033H67.2115L73.0982 236.489C73.1671 236.8 72.9776 237.111 72.6674 237.18C72.6215 237.191 72.5755 237.197 72.5353 237.197Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M85.5548 237.197C85.5146 237.197 85.4687 237.191 85.4227 237.18C85.1126 237.111 84.9231 236.8 84.992 236.489L90.8787 211.033H78.2496C77.9337 211.033 77.6753 210.773 77.6753 210.457C77.6753 210.14 77.9337 209.88 78.2496 209.88H91.6023C91.7803 209.88 91.9411 209.961 92.0502 210.099C92.1594 210.238 92.1996 210.416 92.1594 210.589L86.1119 236.754C86.0487 237.013 85.8132 237.197 85.5548 237.197Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M192.812 135.91C185.082 135.91 173.073 124.121 170.862 121.88C170.081 122.283 168.772 122.456 167.428 121.189C167.336 121.102 167.238 121.016 167.129 120.918C166.038 119.927 163.999 118.089 164.327 114.597C164.499 112.747 165.113 111.37 166.015 110.823C166.503 110.523 167.049 110.483 167.583 110.708C169.3 111.411 171.207 114.13 172.47 115.928C172.821 116.429 173.154 116.902 173.297 117.052C173.854 117.633 174.279 117.801 174.452 117.714C174.745 117.564 175.066 116.596 174.693 114.66C174.153 111.86 176.519 111.198 179.023 110.495C183.641 109.198 190.613 107.239 189.522 91.6764C189.51 91.4748 189.596 91.2846 189.763 91.1694C189.924 91.0542 190.136 91.0311 190.32 91.106C190.785 91.3019 201.685 96.0439 203.908 106.744C205.729 115.513 201.117 134.326 194.168 135.783C193.731 135.87 193.278 135.91 192.812 135.91ZM170.943 120.566C171.092 120.566 171.241 120.624 171.356 120.739C171.506 120.895 186.38 136.233 193.932 134.648C196.626 134.083 199.365 129.964 201.255 123.632C203.041 117.651 203.638 111.111 202.782 106.974C201.042 98.5618 193.329 93.9236 190.728 92.5753C191.52 108.173 184.209 110.23 179.333 111.601C176.479 112.402 175.508 112.828 175.819 114.441C176.249 116.671 175.945 118.238 174.98 118.74C174.567 118.959 173.688 119.126 172.465 117.852C172.264 117.639 171.953 117.201 171.528 116.596C170.489 115.116 168.554 112.356 167.147 111.779C166.951 111.699 166.785 111.71 166.607 111.814C166.182 112.073 165.63 112.984 165.47 114.712C165.2 117.633 166.825 119.103 167.899 120.071C168.014 120.174 168.117 120.267 168.215 120.359C169.49 121.563 170.455 120.802 170.564 120.71C170.673 120.612 170.805 120.566 170.943 120.566Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M203.736 108.582C203.736 108.582 221.074 98.4812 209.341 84.9812C203.822 78.6317 197.326 77.6637 191.428 78.4185C186.753 79.0177 181.539 83.0971 181.539 83.0971C181.539 83.0971 174.199 83.5408 169.335 87.4934C163.879 91.9242 161.047 100.313 166.899 111.105L167.353 110.904L168.077 111.422L169.122 112.119L170.139 113.105L171.184 114.781L172.643 116.717L173.297 117.53L174.262 118.002L174.968 117.633L175.434 116.112L174.968 113.629L175.75 112.269L177.524 111.416L180.999 110.345L184.462 108.922L187.04 106.144L188.993 102.929L189.774 99.7142L190.015 95.946V91.3423L194.242 93.6989L197.608 96.3666L201.048 100.63L202.926 104.214L203.736 107.458V108.582Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M174.262 118.578C174.176 118.578 174.09 118.561 174.01 118.521L173.045 118.048C172.97 118.014 172.901 117.956 172.849 117.893L172.2 117.08L170.73 115.133L169.696 113.473L168.766 112.575L167.29 111.566L167.135 111.635C166.865 111.756 166.544 111.647 166.4 111.382C163.609 106.237 162.569 101.339 163.316 96.8218C163.959 92.9152 165.918 89.5331 168.979 87.0497C173.562 83.3218 180.143 82.6361 181.332 82.5382C182.222 81.8641 186.96 78.4127 191.359 77.8481C198.957 76.8743 204.982 79.0869 209.777 84.6009C213.126 88.4498 214.492 92.414 213.838 96.3896C212.58 104.018 204.379 108.876 204.034 109.077C203.856 109.181 203.638 109.181 203.46 109.077C203.282 108.973 203.173 108.783 203.173 108.576V107.521L202.392 104.416L200.571 100.941L197.206 96.7699L193.927 94.1713L190.596 92.316V95.9402L190.354 99.743C190.354 99.7776 190.349 99.8122 190.337 99.841L189.556 103.056C189.545 103.114 189.522 103.171 189.487 103.217L187.534 106.432C187.512 106.467 187.489 106.496 187.466 106.525L184.887 109.302C184.829 109.365 184.761 109.411 184.686 109.44L181.223 110.863L177.743 111.941L176.169 112.696L175.583 113.715L176.008 115.991C176.025 116.084 176.02 116.176 175.991 116.268L175.526 117.789C175.48 117.939 175.376 118.06 175.239 118.129L174.532 118.498C174.446 118.555 174.354 118.578 174.262 118.578ZM173.665 117.069L174.256 117.357L174.492 117.236L174.842 116.084L174.406 113.738C174.383 113.6 174.406 113.462 174.475 113.347L175.256 111.987C175.313 111.889 175.399 111.803 175.503 111.756L177.277 110.904C177.3 110.892 177.329 110.881 177.358 110.875L180.832 109.803L184.129 108.449L186.581 105.804L188.459 102.716L189.206 99.6335L189.441 95.9172V91.348C189.441 91.1464 189.55 90.9562 189.723 90.8525C189.901 90.7488 190.113 90.7488 190.291 90.8468L194.518 93.2033C194.547 93.2206 194.57 93.2379 194.593 93.2552L197.958 95.9229C197.993 95.9517 198.021 95.9805 198.05 96.0151L201.49 100.279C201.513 100.308 201.536 100.342 201.553 100.371L203.431 103.955C203.454 103.995 203.472 104.036 203.477 104.082L204.287 107.326C204.299 107.372 204.304 107.418 204.304 107.464V107.533C206.418 106.081 211.759 101.898 212.689 96.2053C213.281 92.5926 212.006 88.9453 208.899 85.3673C204.373 80.1643 198.682 78.0785 191.491 79.0004C187.035 79.5709 181.935 83.5235 181.883 83.5638C181.791 83.6329 181.682 83.679 181.567 83.6848C181.499 83.6906 174.348 84.1688 169.691 87.9543C163.408 93.0593 162.472 101.414 167.152 110.379C167.33 110.31 167.531 110.339 167.686 110.448L168.41 110.967L169.438 111.653C169.467 111.67 169.495 111.693 169.518 111.716L170.535 112.701C170.569 112.736 170.598 112.771 170.621 112.811L171.666 114.488L173.665 117.069Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M204.362 119.731C200.474 119.731 197.304 116.556 197.304 112.65C197.304 108.743 200.468 105.568 204.362 105.568C208.256 105.568 211.42 108.743 211.42 112.65C211.42 116.556 208.256 119.731 204.362 119.731ZM204.362 106.726C201.106 106.726 198.452 109.383 198.452 112.655C198.452 115.928 201.1 118.584 204.362 118.584C207.624 118.584 210.272 115.928 210.272 112.655C210.272 109.383 207.624 106.726 204.362 106.726Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M188.419 119.731C184.192 119.731 180.752 116.279 180.752 112.039C180.752 107.798 184.192 104.347 188.419 104.347C192.646 104.347 196.086 107.798 196.086 112.039C196.086 116.279 192.646 119.731 188.419 119.731ZM188.419 105.499C184.824 105.499 181.901 108.432 181.901 112.039C181.901 115.646 184.824 118.578 188.419 118.578C192.014 118.578 194.937 115.646 194.937 112.039C194.937 108.432 192.014 105.499 188.419 105.499Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M197.774 113.629H196.126C195.81 113.629 195.552 113.37 195.552 113.053C195.552 112.736 195.81 112.477 196.126 112.477H197.774C198.09 112.477 198.349 112.736 198.349 113.053C198.349 113.37 198.096 113.629 197.774 113.629Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M189.775 113.629C189.177 113.629 188.695 113.145 188.695 112.546C188.695 111.947 189.177 111.463 189.775 111.463C190.372 111.463 190.854 111.947 190.854 112.546C190.854 113.139 190.366 113.629 189.775 113.629ZM189.775 112.477C189.734 112.477 189.706 112.505 189.706 112.546C189.706 112.621 189.843 112.621 189.843 112.546C189.843 112.505 189.809 112.477 189.775 112.477Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M199.888 113.629C199.291 113.629 198.808 113.145 198.808 112.546C198.808 111.947 199.291 111.463 199.888 111.463C200.485 111.463 200.967 111.947 200.967 112.546C200.967 113.139 200.485 113.629 199.888 113.629ZM199.888 112.477C199.848 112.477 199.819 112.505 199.819 112.546C199.819 112.621 199.957 112.621 199.957 112.546C199.957 112.505 199.928 112.477 199.888 112.477Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M79.0879 210.802C79.0591 210.802 79.0247 210.802 78.996 210.796C74.9528 210.14 71.5414 206.573 68.8479 200.195C66.8838 195.533 66.074 191.131 66.0396 190.941C65.9994 190.717 66.0913 190.492 66.2808 190.365C66.4646 190.233 66.7115 190.227 66.901 190.348C74.4991 194.963 78.9385 199.757 80.1044 204.608C80.9716 208.204 79.6277 210.439 79.5703 210.531C79.4726 210.704 79.2831 210.802 79.0879 210.802ZM67.4524 192.042C68.3828 196.052 71.731 207.99 78.7605 209.575C79.4209 207.95 81.2243 200.834 67.4524 192.042Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M80.5752 210.802C80.3799 210.802 80.1904 210.699 80.087 210.532C80.0296 210.439 78.6915 208.204 79.5529 204.608C80.7188 199.757 85.1639 194.963 92.7563 190.348C92.9516 190.233 93.1928 190.238 93.3765 190.365C93.5603 190.492 93.658 190.722 93.6178 190.941C93.5833 191.126 92.7735 195.528 90.8094 200.195C88.1216 206.573 84.7045 210.14 80.6614 210.797C80.6326 210.802 80.6039 210.802 80.5752 210.802ZM92.2107 192.042C84.1646 197.181 81.5171 201.693 80.736 204.62C80.0641 207.12 80.5924 208.866 80.8968 209.575C87.9321 208.002 91.2803 196.058 92.2107 192.042Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M79.8404 211.033C79.8174 211.033 79.8002 211.033 79.7772 211.027C79.4614 210.992 79.2316 210.71 79.2661 210.393L79.7772 205.686C80.7593 196.634 80.834 189.691 72.7879 182.713C72.5467 182.506 72.5237 182.143 72.7305 181.901C72.9372 181.659 73.299 181.636 73.5402 181.843C81.9941 189.172 81.9137 196.715 80.9258 205.813L80.4147 210.52C80.3745 210.814 80.1276 211.033 79.8404 211.033Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M197.056 114.862H198.337C199.204 114.862 199.91 115.571 199.91 116.441C199.91 117.311 199.204 118.02 198.337 118.02H197.056"
                                                            fill="white"></path>
                                                        <path
                                                            d="M198.332 118.308H197.051C196.89 118.308 196.764 118.181 196.764 118.02C196.764 117.858 196.89 117.731 197.051 117.731H198.332C199.044 117.731 199.618 117.149 199.618 116.441C199.618 115.732 199.038 115.15 198.332 115.15H197.051C196.89 115.15 196.764 115.023 196.764 114.862C196.764 114.701 196.89 114.574 197.051 114.574H198.332C199.36 114.574 200.192 115.409 200.192 116.441C200.192 117.472 199.36 118.308 198.332 118.308Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M196.281 124.525C195.426 124.525 194.576 124.104 193.749 123.274C193.634 123.159 193.634 122.98 193.749 122.865C193.864 122.75 194.042 122.75 194.157 122.865C194.92 123.632 195.69 123.989 196.437 123.937C197.528 123.856 198.246 122.906 198.257 122.894C198.349 122.767 198.533 122.738 198.659 122.836C198.785 122.929 198.814 123.113 198.717 123.24C198.682 123.286 197.844 124.409 196.482 124.513C196.414 124.525 196.35 124.525 196.281 124.525Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M128.995 136.48C128.714 136.48 128.467 136.273 128.427 135.979C128.386 135.662 128.605 135.374 128.921 135.334C131.028 135.046 132.234 134.746 132.246 134.746C132.556 134.671 132.866 134.856 132.941 135.167C133.015 135.478 132.832 135.789 132.521 135.864C132.47 135.875 131.246 136.181 129.07 136.48C129.047 136.48 129.024 136.48 128.995 136.48Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M117.641 136.936C117.63 136.936 117.624 136.936 117.612 136.936C115.327 136.826 113.018 136.601 110.755 136.261C110.439 136.215 110.227 135.922 110.273 135.605C110.319 135.294 110.612 135.08 110.928 135.121C113.15 135.455 115.419 135.68 117.664 135.783C117.98 135.801 118.227 136.071 118.21 136.388C118.204 136.694 117.946 136.936 117.641 136.936ZM99.7859 133.634C99.7285 133.634 99.6653 133.623 99.6079 133.605C97.437 132.885 95.2776 132.05 93.1871 131.11C92.9 130.978 92.7679 130.638 92.9 130.35C93.0321 130.062 93.3709 129.929 93.6581 130.062C95.7084 130.984 97.8333 131.808 99.9697 132.511C100.268 132.608 100.435 132.937 100.337 133.237C100.251 133.479 100.027 133.634 99.7859 133.634ZM83.4756 125.642C83.3665 125.642 83.2573 125.614 83.1597 125.544C81.276 124.283 79.4152 122.906 77.6291 121.442C77.3822 121.24 77.3477 120.877 77.5487 120.63C77.7497 120.382 78.1115 120.347 78.3585 120.549C80.1159 121.989 81.9479 123.343 83.8029 124.582C84.0671 124.761 84.136 125.118 83.9637 125.383C83.8431 125.556 83.6594 125.642 83.4756 125.642ZM69.7381 113.738C69.5831 113.738 69.428 113.675 69.3131 113.548C67.797 111.883 66.3038 110.114 64.8852 108.282C64.69 108.029 64.7359 107.671 64.9829 107.475C65.2356 107.279 65.5916 107.326 65.7869 107.573C67.1882 109.377 68.6584 111.128 70.1574 112.771C70.3699 113.007 70.3526 113.37 70.1229 113.583C70.0195 113.687 69.876 113.738 69.7381 113.738ZM58.8952 99.115C58.6999 99.115 58.5104 99.017 58.407 98.8384C57.2412 96.9197 56.1041 94.9088 55.0186 92.8576C54.8693 92.5753 54.9784 92.2296 55.2598 92.0798C55.5412 91.93 55.8858 92.0394 56.0351 92.3218C57.1091 94.3557 58.2347 96.3435 59.3891 98.2449C59.5556 98.5157 59.4695 98.873 59.1996 99.0343C59.0962 99.0919 58.9928 99.115 58.8952 99.115ZM50.6596 82.8551C50.4356 82.8551 50.2231 82.7226 50.1312 82.5036C49.264 80.4409 48.4141 78.2917 47.6158 76.1138C47.5067 75.8141 47.656 75.4857 47.9546 75.3762C48.2533 75.2668 48.5806 75.4166 48.6897 75.7162C49.4823 77.8769 50.3265 80.0088 51.188 82.06C51.3086 82.3538 51.1765 82.6938 50.8836 82.8148C50.8089 82.8378 50.7343 82.8551 50.6596 82.8551ZM44.2388 65.7713C44.0149 65.7713 43.7966 65.633 43.7047 65.414C42.8375 63.2764 41.9129 61.1791 40.9538 59.1855C40.816 58.8974 40.9366 58.5517 41.2237 58.4192C41.5109 58.2809 41.8555 58.4019 41.9876 58.69C42.9581 60.7066 43.8943 62.827 44.7672 64.9819C44.8878 65.2758 44.7442 65.6157 44.4513 65.7309C44.3824 65.754 44.3078 65.7713 44.2388 65.7713ZM35.6013 62.2738C33.7979 62.2738 32.0348 62.2335 30.3693 62.1644C30.0534 62.1528 29.8065 61.882 29.8237 61.5651C29.8409 61.2482 30.1109 61.0062 30.421 61.0178C32.5574 61.1157 34.8259 61.1445 37.2151 61.1215H37.2208C37.5367 61.1215 37.7894 61.375 37.7951 61.6919C37.8008 62.0088 37.5424 62.2738 37.2265 62.2738C36.681 62.2738 36.1354 62.2738 35.6013 62.2738ZM48.5864 61.7207C48.2877 61.7207 48.0408 61.4902 48.0121 61.1906C47.9891 60.8737 48.2245 60.5972 48.5404 60.5683C50.7228 60.3955 53.0028 60.1823 55.323 59.9288C55.6331 59.8942 55.9203 60.1247 55.9547 60.4416C55.9892 60.7585 55.7595 61.0408 55.4436 61.0754C53.1119 61.3289 50.8204 61.5479 48.6266 61.7207C48.6151 61.7207 48.5978 61.7207 48.5864 61.7207ZM19.1014 60.9025C19.0669 60.9025 19.0267 60.8968 18.9923 60.891C16.5514 60.4128 14.3116 59.802 12.3303 59.076C12.0316 58.9666 11.8766 58.6381 11.9857 58.3385C12.0948 58.0389 12.4222 57.8833 12.7208 57.9928C14.6447 58.6957 16.8329 59.2892 19.2105 59.7559C19.5206 59.8193 19.7274 60.1189 19.6642 60.4301C19.6125 60.7124 19.3713 60.9025 19.1014 60.9025ZM66.6656 59.6119C66.3842 59.6119 66.143 59.4045 66.097 59.1221C66.0511 58.8052 66.2693 58.5171 66.5794 58.4653C68.7675 58.1369 71.0303 57.7796 73.3103 57.3936C73.6262 57.3417 73.9191 57.5549 73.9708 57.866C74.0225 58.1772 73.81 58.4768 73.4999 58.5287C71.2141 58.9147 68.9398 59.2777 66.746 59.6061C66.723 59.6119 66.6943 59.6119 66.6656 59.6119ZM84.607 56.489C84.3371 56.489 84.0958 56.2988 84.0441 56.0223C83.981 55.7111 84.1877 55.4057 84.4979 55.3481C86.663 54.9217 88.9143 54.4666 91.1828 53.9883C91.4929 53.925 91.7973 54.1209 91.8605 54.432C91.9237 54.7431 91.7284 55.0485 91.4183 55.1119C89.144 55.5901 86.887 56.0453 84.7161 56.4717C84.6759 56.489 84.6414 56.489 84.607 56.489ZM3.17581 52.8878C3.00352 52.8878 2.83697 52.8129 2.72211 52.6689C1.22891 50.7502 0.315755 48.5607 -0.000114081 46.1522C-0.0403157 45.8353 0.177921 45.5473 0.493791 45.5069C0.803917 45.4666 1.09681 45.6855 1.13702 46.0024C1.42417 48.2035 2.26266 50.2086 3.62377 51.9602C3.81904 52.2137 3.77309 52.5709 3.52614 52.7668C3.42851 52.8475 3.30216 52.8878 3.17581 52.8878ZM35.9344 49.546C35.7448 49.546 35.5611 49.4538 35.4519 49.2809C34.1885 47.3219 32.8675 45.4608 31.5237 43.7496C31.3284 43.5018 31.3686 43.1388 31.6213 42.9429C31.8682 42.747 32.2301 42.7873 32.4253 43.0409C33.7922 44.7809 35.1361 46.6708 36.4168 48.6586C36.5891 48.9237 36.5144 49.2809 36.2445 49.4538C36.1468 49.5114 36.0377 49.546 35.9344 49.546ZM24.0806 35.7752C23.9543 35.7752 23.8222 35.7349 23.7188 35.6484C21.8466 34.1215 19.9743 32.8712 18.1423 31.9378C17.8609 31.7938 17.746 31.4481 17.8896 31.1657C18.0332 30.8834 18.3778 30.7682 18.6592 30.9122C20.5601 31.8802 22.507 33.1766 24.4424 34.7553C24.6894 34.957 24.7239 35.32 24.5228 35.5678C24.408 35.7003 24.2472 35.7752 24.0806 35.7752ZM2.92886 35.6657C2.83697 35.6657 2.74508 35.6427 2.65893 35.5966C2.37752 35.4468 2.27415 35.0953 2.42347 34.8187C2.99203 33.7586 3.63526 32.7618 4.28423 31.9378C5.08251 30.9237 6.07032 30.1459 7.22468 29.6216C7.51184 29.489 7.85642 29.6216 7.98277 29.9096C8.11486 30.1977 7.98277 30.5435 7.69562 30.6702C6.70781 31.1196 5.86357 31.7822 5.18015 32.6523C4.57712 33.4186 3.9741 34.3578 3.43425 35.3603C3.33087 35.5562 3.13561 35.6657 2.92886 35.6657Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M102.554 52.6458C102.29 52.6458 102.054 52.4672 101.997 52.1964C101.928 51.8853 102.118 51.5799 102.428 51.505C103.536 51.2515 104.65 50.9864 105.782 50.7214C106.086 50.6465 106.402 50.8424 106.471 51.1478C106.546 51.4589 106.35 51.77 106.046 51.8392C104.915 52.1042 103.795 52.3693 102.686 52.6228C102.64 52.6401 102.6 52.6458 102.554 52.6458Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M205.619 185.243C205.504 185.243 205.384 185.208 205.286 185.139L200.06 181.417C199.911 181.307 199.819 181.135 199.819 180.944V171.737C199.819 171.42 200.077 171.161 200.393 171.161H210.846C211.161 171.161 211.42 171.42 211.42 171.737V180.944C211.42 181.129 211.328 181.307 211.179 181.417L205.952 185.139C205.855 185.208 205.74 185.243 205.619 185.243ZM200.967 180.651L205.619 183.964L210.271 180.651V172.313H200.967V180.651Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M247.671 120.826C247.527 120.826 247.384 120.768 247.269 120.664C247.096 120.497 247.045 120.238 247.142 120.019L251.237 110.748C245.77 110.304 241.462 105.701 241.462 100.106V72.8007C241.462 66.9121 246.235 62.124 252.104 62.124H302.689C308.559 62.124 313.331 66.9121 313.331 72.8007V100.106C313.331 105.995 308.559 110.783 302.689 110.783H268.455L247.918 120.774C247.843 120.808 247.757 120.826 247.671 120.826ZM252.104 63.2706C246.867 63.2706 242.611 67.5459 242.611 72.7949V100.1C242.611 105.355 246.872 109.625 252.104 109.625C252.3 109.625 252.478 109.723 252.587 109.884C252.69 110.045 252.707 110.253 252.633 110.431L248.831 119.039L268.076 109.676C268.156 109.636 268.237 109.619 268.329 109.619H302.695C307.933 109.619 312.188 105.344 312.188 100.094V72.7892C312.188 67.5344 307.927 63.2649 302.695 63.2649H252.104V63.2706Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M279.131 100.486C272.739 100.486 267.151 96.1419 265.543 89.9249C265.244 88.761 265.089 87.5683 265.089 86.3813C265.089 79.9684 269.419 74.3622 275.616 72.7489C278.78 71.9249 282.192 72.2533 285.132 73.6477C285.419 73.786 285.54 74.1259 285.408 74.414C285.27 74.7021 284.931 74.8231 284.644 74.6906C281.945 73.4115 278.809 73.1119 275.903 73.8667C270.212 75.3474 266.237 80.4928 266.237 86.3813C266.237 87.4761 266.375 88.5708 266.651 89.6368C268.127 95.3467 273.256 99.3339 279.125 99.3339C280.216 99.3339 281.307 99.1956 282.37 98.9191C288.061 97.4383 292.035 92.293 292.035 86.4044C292.035 85.3096 291.898 84.2149 291.622 83.149C291.599 83.051 291.57 82.9473 291.542 82.8493C291.455 82.544 291.633 82.2271 291.938 82.1406C292.242 82.0542 292.558 82.2328 292.644 82.5382C292.673 82.6477 292.702 82.7514 292.73 82.8609C293.029 84.0248 293.184 85.2175 293.184 86.4044C293.184 92.8173 288.854 98.4236 282.663 100.037C281.503 100.331 280.314 100.486 279.131 100.486Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M278.287 90.0286C278.137 90.0286 277.994 89.971 277.885 89.8615L272.383 84.4511C272.159 84.2264 272.153 83.8634 272.377 83.6387C272.601 83.414 272.963 83.4082 273.187 83.6329L278.269 88.6285L290.474 75.5721C290.692 75.3417 291.054 75.3301 291.283 75.5433C291.513 75.7623 291.524 76.1253 291.312 76.3558L278.706 89.8384C278.603 89.9537 278.453 90.0171 278.298 90.0228C278.298 90.0286 278.292 90.0286 278.287 90.0286Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M310.879 190.094H299.95C298.554 190.094 297.423 188.959 297.423 187.559C297.423 186.159 298.554 185.024 299.95 185.024H310.879C312.274 185.024 313.406 186.159 313.406 187.559C313.4 188.959 312.269 190.094 310.879 190.094Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M310.879 190.67H299.95C298.238 190.67 296.849 189.276 296.849 187.559C296.849 185.842 298.238 184.448 299.95 184.448H310.879C312.59 184.448 313.98 185.842 313.98 187.559C313.98 189.276 312.585 190.67 310.879 190.67ZM299.95 185.606C298.876 185.606 297.997 186.482 297.997 187.565C297.997 188.642 298.87 189.524 299.95 189.524H310.879C311.953 189.524 312.832 188.648 312.832 187.565C312.832 186.487 311.959 185.606 310.879 185.606H299.95Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M310.149 195.165H299.22C297.825 195.165 296.693 194.03 296.693 192.629C296.693 191.229 297.825 190.094 299.22 190.094H310.149C311.545 190.094 312.676 191.229 312.676 192.629C312.676 194.03 311.545 195.165 310.149 195.165Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M310.149 195.741H299.22C297.509 195.741 296.119 194.346 296.119 192.629C296.119 190.912 297.509 189.518 299.22 189.518H310.149C311.861 189.518 313.251 190.912 313.251 192.629C313.251 194.346 311.861 195.741 310.149 195.741ZM299.226 190.67C298.152 190.67 297.274 191.546 297.274 192.629C297.274 193.713 298.146 194.588 299.226 194.588H310.155C311.229 194.588 312.108 193.713 312.108 192.629C312.108 191.546 311.235 190.67 310.155 190.67H299.226Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M309.11 200.229H298.181C296.785 200.229 295.654 199.094 295.654 197.694C295.654 196.294 296.785 195.159 298.181 195.159H309.11C310.505 195.159 311.637 196.294 311.637 197.694C311.631 199.094 310.505 200.229 309.11 200.229Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M309.11 200.805H298.181C296.469 200.805 295.08 199.411 295.08 197.694C295.08 195.977 296.469 194.583 298.181 194.583H309.11C310.821 194.583 312.211 195.977 312.211 197.694C312.211 199.411 310.816 200.805 309.11 200.805ZM298.181 195.741C297.107 195.741 296.228 196.617 296.228 197.7C296.228 198.777 297.101 199.659 298.181 199.659H309.11C310.184 199.659 311.063 198.783 311.063 197.7C311.063 196.622 310.19 195.741 309.11 195.741H298.181Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M308.099 205.3H297.17C295.774 205.3 294.643 204.165 294.643 202.765C294.643 201.364 295.774 200.229 297.17 200.229H308.099C309.495 200.229 310.626 201.364 310.626 202.765C310.62 204.165 309.489 205.3 308.099 205.3Z"
                                                            fill="white"></path>
                                                        <path
                                                            d="M308.099 205.876H297.17C295.459 205.876 294.069 204.482 294.069 202.765C294.069 201.047 295.459 199.653 297.17 199.653H308.099C309.811 199.653 311.2 201.047 311.2 202.765C311.2 204.482 309.805 205.876 308.099 205.876ZM297.17 200.805C296.096 200.805 295.217 201.681 295.217 202.765C295.217 203.842 296.09 204.724 297.17 204.724H308.099C309.173 204.724 310.052 203.848 310.052 202.765C310.052 201.687 309.179 200.805 308.099 200.805H297.17Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M306.658 164.414C306.342 164.414 306.083 164.154 306.083 163.838V154.889C306.083 154.573 306.342 154.313 306.658 154.313C306.974 154.313 307.232 154.573 307.232 154.889V163.838C307.232 164.154 306.974 164.414 306.658 164.414Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M315.456 172.313C315.307 172.313 315.163 172.256 315.048 172.146C314.824 171.921 314.824 171.558 315.048 171.334L326.557 159.793C326.781 159.568 327.143 159.568 327.367 159.793C327.591 160.017 327.591 160.38 327.367 160.605L315.858 172.146C315.749 172.256 315.6 172.313 315.456 172.313Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M330.285 181.521H321.211C320.895 181.521 320.636 181.261 320.636 180.944C320.636 180.628 320.895 180.368 321.211 180.368H330.285C330.6 180.368 330.859 180.628 330.859 180.944C330.859 181.261 330.6 181.521 330.285 181.521Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M119.06 82.1349C118.744 82.1349 118.485 81.8756 118.485 81.5587V78.3897C118.485 78.0728 118.744 77.8135 119.06 77.8135C119.376 77.8135 119.634 78.0728 119.634 78.3897V81.5587C119.634 81.8756 119.376 82.1349 119.06 82.1349Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M119.06 90.3512C118.744 90.3512 118.485 90.092 118.485 89.7751V86.6061C118.485 86.2892 118.744 86.0299 119.06 86.0299C119.376 86.0299 119.634 86.2892 119.634 86.6061V89.7751C119.634 90.092 119.376 90.3512 119.06 90.3512Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M124.499 84.6182H121.34C121.024 84.6182 120.766 84.3589 120.766 84.042C120.766 83.7251 121.024 83.4659 121.34 83.4659H124.499C124.814 83.4659 125.073 83.7251 125.073 84.042C125.073 84.3589 124.814 84.6182 124.499 84.6182Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M116.596 84.6182H113.438C113.122 84.6182 112.863 84.3589 112.863 84.042C112.863 83.7251 113.122 83.4659 113.438 83.4659H116.596C116.912 83.4659 117.171 83.7251 117.171 84.042C117.171 84.3589 116.912 84.6182 116.596 84.6182Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M327.051 120.192C326.735 120.192 326.477 119.932 326.477 119.616V116.447C326.477 116.13 326.735 115.87 327.051 115.87C327.367 115.87 327.626 116.13 327.626 116.447V119.616C327.626 119.932 327.367 120.192 327.051 120.192Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M327.051 128.408C326.735 128.408 326.477 128.149 326.477 127.832V124.663C326.477 124.346 326.735 124.087 327.051 124.087C327.367 124.087 327.626 124.346 327.626 124.663V127.832C327.626 128.149 327.367 128.408 327.051 128.408Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M332.496 122.669H329.337C329.021 122.669 328.763 122.41 328.763 122.093C328.763 121.776 329.021 121.517 329.337 121.517H332.496C332.812 121.517 333.07 121.776 333.07 122.093C333.07 122.41 332.812 122.669 332.496 122.669Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M324.587 122.669H321.429C321.113 122.669 320.854 122.41 320.854 122.093C320.854 121.776 321.113 121.517 321.429 121.517H324.587C324.903 121.517 325.162 121.776 325.162 122.093C325.162 122.41 324.909 122.669 324.587 122.669Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M194.042 4.32137C193.726 4.32137 193.467 4.06209 193.467 3.74519V0.576183C193.467 0.259282 193.726 0 194.042 0C194.357 0 194.616 0.259282 194.616 0.576183V3.74519C194.616 4.06209 194.357 4.32137 194.042 4.32137Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M194.042 12.5377C193.726 12.5377 193.467 12.2785 193.467 11.9616V8.79255C193.467 8.47565 193.726 8.21637 194.042 8.21637C194.357 8.21637 194.616 8.47565 194.616 8.79255V11.9616C194.616 12.2842 194.357 12.5377 194.042 12.5377Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M199.486 6.80472H196.327C196.011 6.80472 195.753 6.54544 195.753 6.22854C195.753 5.91164 196.011 5.65236 196.327 5.65236H199.486C199.802 5.65236 200.06 5.91164 200.06 6.22854C200.06 6.54544 199.802 6.80472 199.486 6.80472Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M191.578 6.80472H188.419C188.103 6.80472 187.845 6.54544 187.845 6.22854C187.845 5.91164 188.103 5.65236 188.419 5.65236H191.578C191.894 5.65236 192.152 5.91164 192.152 6.22854C192.152 6.54544 191.894 6.80472 191.578 6.80472Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M34.1487 142.594H21.1119C20.796 142.594 20.5376 142.334 20.5376 142.018C20.5376 141.701 20.796 141.441 21.1119 141.441H34.1487C34.4646 141.441 34.723 141.701 34.723 142.018C34.723 142.334 34.4646 142.594 34.1487 142.594Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M42.3896 142.594H38.4268C38.111 142.594 37.8525 142.334 37.8525 142.018C37.8525 141.701 38.111 141.441 38.4268 141.441H42.3896C42.7054 141.441 42.9639 141.701 42.9639 142.018C42.9639 142.334 42.7112 142.594 42.3896 142.594Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M308.065 32.8655H295.028C294.712 32.8655 294.454 32.6062 294.454 32.2893C294.454 31.9724 294.712 31.7131 295.028 31.7131H308.065C308.381 31.7131 308.639 31.9724 308.639 32.2893C308.639 32.6062 308.381 32.8655 308.065 32.8655Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M290.749 32.8655H286.787C286.471 32.8655 286.212 32.6062 286.212 32.2893C286.212 31.9724 286.471 31.7131 286.787 31.7131H290.749C291.065 31.7131 291.324 31.9724 291.324 32.2893C291.324 32.6062 291.065 32.8655 290.749 32.8655Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M399.184 96.597H386.148C385.832 96.597 385.573 96.3378 385.573 96.0209C385.573 95.704 385.832 95.4447 386.148 95.4447H399.184C399.5 95.4447 399.759 95.704 399.759 96.0209C399.759 96.3378 399.5 96.597 399.184 96.597Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M407.426 96.597H403.463C403.147 96.597 402.889 96.3378 402.889 96.0209C402.889 95.704 403.147 95.4447 403.463 95.4447H407.426C407.742 95.4447 408 95.704 408 96.0209C408 96.3378 407.742 96.597 407.426 96.597Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M368.667 69.9025C368.432 69.9025 368.208 69.8046 368.041 69.6432L362.333 63.916C361.402 62.9826 360.891 61.7438 360.891 60.4243C360.891 59.1048 361.402 57.866 362.333 56.9326C363.263 55.9992 364.498 55.4864 365.813 55.4864C366.841 55.4864 367.84 55.8091 368.667 56.4025C369.494 55.8091 370.494 55.4864 371.522 55.4864C372.837 55.4864 374.071 55.9992 375.002 56.9326C375.932 57.866 376.443 59.1048 376.443 60.4243C376.443 61.7438 375.932 62.9826 375.002 63.916L369.287 69.649C369.127 69.8103 368.897 69.9025 368.667 69.9025ZM368.851 68.825C368.851 68.8308 368.851 68.825 368.851 68.825V68.825ZM365.807 56.633C364.802 56.633 363.855 57.0248 363.137 57.7393C362.424 58.4538 362.034 59.4045 362.034 60.4185C362.034 61.4269 362.424 62.3776 363.137 63.0978L368.661 68.6407L374.186 63.0978C374.898 62.3833 375.289 61.4326 375.289 60.4185C375.289 59.4045 374.898 58.4538 374.186 57.7393C373.474 57.0248 372.527 56.633 371.516 56.633C370.603 56.633 369.724 56.9614 369.041 57.5664L368.661 57.9006L368.282 57.5664C367.605 56.9672 366.72 56.633 365.807 56.633Z"
                                                            fill="black"></path>
                                                        <path
                                                            d="M70.1515 184.476C69.6231 184.476 69.0948 184.379 68.5894 184.177C66.4128 183.313 65.3445 180.829 66.206 178.645C66.6252 177.585 67.4235 176.756 68.4688 176.306C69.5083 175.857 70.6626 175.834 71.7194 176.254C73.896 177.119 74.9642 179.596 74.1027 181.786C73.6835 182.846 72.8795 183.676 71.84 184.125C71.3001 184.355 70.7258 184.476 70.1515 184.476ZM70.1515 177.101C69.7323 177.101 69.3188 177.188 68.9225 177.361C68.1644 177.689 67.5786 178.294 67.2742 179.066C66.6482 180.662 67.4235 182.471 69.0144 183.099C69.7839 183.405 70.6282 183.393 71.3863 183.059C72.1443 182.725 72.7301 182.12 73.0345 181.348C73.6605 179.758 72.8795 177.943 71.2944 177.315C70.9211 177.176 70.5363 177.101 70.1515 177.101Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M76.986 180.161C76.8425 180.161 76.6931 180.132 76.5496 180.074C76.2567 179.959 76.0212 179.729 75.8948 179.441C75.7685 179.147 75.7628 178.824 75.8834 178.53C76.1246 177.92 76.8137 177.62 77.4283 177.856C78.037 178.098 78.3357 178.795 78.0944 179.406C77.9049 179.873 77.457 180.161 76.986 180.161ZM76.986 178.346C76.9056 178.346 76.8195 178.363 76.7391 178.398C76.5898 178.461 76.4692 178.582 76.4117 178.738C76.3486 178.893 76.3543 179.06 76.4175 179.21C76.4806 179.36 76.6012 179.481 76.7563 179.539C77.0722 179.66 77.4282 179.51 77.5546 179.193C77.6809 178.876 77.5259 178.519 77.21 178.392C77.1411 178.363 77.0607 178.346 76.986 178.346Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M72.0592 186.447C72.3097 186.447 72.5129 186.243 72.5129 185.992C72.5129 185.74 72.3097 185.537 72.0592 185.537C71.8086 185.537 71.6055 185.74 71.6055 185.992C71.6055 186.243 71.8086 186.447 72.0592 186.447Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M72.0588 186.729C71.967 186.729 71.8751 186.712 71.7889 186.677C71.6051 186.603 71.4616 186.464 71.3812 186.286C71.3008 186.101 71.3008 185.9 71.3697 185.721C71.519 185.341 71.9497 185.151 72.3288 185.306C72.7078 185.462 72.8916 185.888 72.7423 186.268C72.6676 186.453 72.5298 186.597 72.3517 186.677C72.2599 186.712 72.1565 186.729 72.0588 186.729ZM72.0588 185.825C71.9957 185.825 71.9325 185.865 71.9038 185.928C71.8866 185.969 71.8866 186.015 71.9038 186.055C71.921 186.096 71.9555 186.124 71.9957 186.142C72.0359 186.159 72.0818 186.159 72.122 186.142C72.1622 186.124 72.1909 186.09 72.2082 186.049C72.2426 185.963 72.2024 185.871 72.1163 185.836C72.099 185.831 72.0818 185.825 72.0588 185.825Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M78.4449 184.085C78.6955 184.085 78.8986 183.881 78.8986 183.629C78.8986 183.378 78.6955 183.174 78.4449 183.174C78.1943 183.174 77.9912 183.378 77.9912 183.629C77.9912 183.881 78.1943 184.085 78.4449 184.085Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M78.4506 184.367C78.3587 184.367 78.2669 184.35 78.1807 184.315C77.8017 184.165 77.6179 183.733 77.7672 183.353C77.8419 183.169 77.9797 183.024 78.1635 182.944C78.3473 182.869 78.5483 182.863 78.7263 182.938C79.1053 183.088 79.2891 183.52 79.1398 183.9C79.0651 184.085 78.9273 184.229 78.7435 184.309C78.6459 184.35 78.5483 184.367 78.4506 184.367ZM78.4449 183.462C78.4219 183.462 78.3989 183.468 78.3817 183.474C78.3415 183.491 78.3128 183.526 78.2956 183.566C78.2611 183.653 78.3013 183.745 78.3875 183.779C78.4277 183.797 78.4736 183.797 78.5138 183.779C78.554 183.762 78.5827 183.727 78.6 183.687C78.6344 183.601 78.5942 183.508 78.5081 183.474C78.4908 183.468 78.4679 183.462 78.4449 183.462Z"
                                                            fill="#BE0017"></path>
                                                        <path
                                                            d="M210.283 92.3621C210.151 92.3621 210.03 92.2699 210.001 92.1316C208.841 86.4447 204.356 85.5862 204.31 85.5804C204.155 85.5516 204.052 85.4018 204.074 85.2463C204.103 85.0907 204.247 84.987 204.408 85.01C204.454 85.0158 209.318 85.9434 210.558 92.0164C210.593 92.172 210.489 92.3275 210.334 92.3563C210.323 92.3621 210.306 92.3621 210.283 92.3621Z"
                                                            fill="white"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="408" height="241" fill="white"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <h2 className="default-form-success__heading">Спасибо, <br/>заявка
                                                отправлена!</h2>
                                            <p className="default-form-success__text">В&nbsp;ближайшее время
                                                мы&nbsp;рассмотрим заявку и&nbsp;свяжемся с&nbsp;вами</p>
                                            <div hidden="">
                                                <a className="js-website-aside-close" href="javascript:void(0);">Закрыть
                                                    окно</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <div className="website-aside js-website-aside js-message-container">
                    <div className="website-aside__inside">
                        <button className="website-aside__close js-website-aside-close" type="button">
                            <svg className="i">
                                <use xlinkHref="#close"></use>
                            </svg>
                        </button>
                        <header className="website-aside__header">
                            <div className="website-aside__heading">Обсудить заказ</div>
                        </header>
                        <div className="website-aside__body">
                            <form className="default-form js-application-form-dev" encType="multipart/form-data"
                                  method="post" action="" data-action="https://marzancreativelab.ru/netcat/add.php"
                                  noValidate="novalidate">
                                <input name="admin_mode" type="hidden" value=""/>
                                <input type="hidden" name="nc_token" value="1d9bd8c339faf0fcf1226a92ba515f58"/> <input
                                name="catalogue" type="hidden" value="1"/>
                                <input name="cc" type="hidden" value="42"/>
                                <input name="sub" type="hidden" value="38"/>
                                <input name="nc_ctpl" type="hidden" value="2207"/>
                                <input name="posting" type="hidden" value="1"/>
                                <input name="curPos" type="hidden" value="0"/>
                                <input name="f_Parent_Message_ID" type="hidden" value="0"/>
                                <input type="hidden" name="f_Checked" value="1"/>
                                <div className="default-form__section">
                                    <div className="default-form__row">
                                        <div className="input  js-input ">
                                            <input className="" type="text" name="f_Company" placeholder="Компания"
                                                   autoComplete="off"/>
                                        </div>
                                    </div>
                                    <div className="default-form__row">
                                        <div className="input  js-input ">
                                            <input className="" type="text" name="f_Name" placeholder="Как вас зовут"
                                                   autoComplete="off"/>
                                        </div>
                                    </div>
                                    <div className="default-form__row">
                                        <div className="default-form__element default-form__element--phone">
                                            <div className="input input--mini js-input ">
                                                <input className="js-input-phone" type="tel" name="f_Phone"
                                                       placeholder="+7 ___ ___ - __ - __" autoComplete="off"
                                                       inputMode="text"/>
                                            </div>
                                        </div>
                                        <div className="default-form__element default-form__element--auto">
                                            <div className="input  js-input ">
                                                <input className="" type="email" name="f_Mail"
                                                       placeholder="Электронная почта" autoComplete="off"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="default-form__section">
                                    <div className="default-form__row">
                                        <button className="button" type="submit">
                                            <span>Отправить</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="default-form-success js-success-message">
                        <div className="default-form-success__content">
                            <div className="default-form-success__icon">
                                <svg className="i _success-alt" viewBox="0 0 408 241" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path
                                            d="M352.849 241H35.0043C33.4651 241 32.2246 239.75 32.2246 238.211C32.2246 236.667 33.4709 235.423 35.0043 235.423H352.849C354.389 235.423 355.629 236.673 355.629 238.211C355.629 239.75 354.383 241 352.849 241Z"
                                            fill="black"></path>
                                        <path
                                            d="M303.643 174.86V184.649C303.643 186.372 302.253 187.772 300.53 187.772C298.813 187.772 297.417 186.378 297.417 184.649V174.86C297.417 173.137 298.807 171.737 300.53 171.737C302.253 171.737 303.643 173.137 303.643 174.86Z"
                                            fill="white"></path>
                                        <path
                                            d="M300.536 188.343C298.503 188.343 296.849 186.683 296.849 184.644V174.854C296.849 172.815 298.503 171.155 300.536 171.155C302.569 171.155 304.223 172.815 304.223 174.854V184.644C304.217 186.683 302.569 188.343 300.536 188.343ZM300.536 172.313C299.134 172.313 297.997 173.454 297.997 174.86V184.649C297.997 186.055 299.134 187.196 300.536 187.196C301.937 187.196 303.074 186.055 303.074 184.649V174.86C303.068 173.454 301.931 172.313 300.536 172.313Z"
                                            fill="black"></path>
                                        <path
                                            d="M134.859 221.081C127.071 221.081 121.776 219.088 119.106 215.164C115.487 209.834 118.095 203.001 118.21 202.713C118.342 202.35 132.005 164.742 137.001 154.325C141.234 145.509 152.519 148.926 152.657 148.966C169.174 154.135 164.717 170.274 164.671 170.435C164.665 170.458 164.654 170.481 164.648 170.504L154.954 192.722L176.341 193.678C176.422 193.684 176.496 193.701 176.565 193.736C176.812 193.857 182.613 196.778 182.613 206.613C182.613 216.627 179.586 219.75 179.46 219.877C179.356 219.975 179.224 220.038 179.081 220.044C178.868 220.056 157.613 221.081 134.859 221.081ZM147.54 149.41C147.212 149.41 146.873 149.422 146.535 149.445C142.486 149.71 139.626 151.519 138.041 154.826C133.067 165.192 119.427 202.741 119.289 203.122C119.261 203.202 116.785 209.702 120.065 214.519C122.506 218.108 127.485 219.929 134.865 219.929C156.258 219.929 176.33 219.019 178.776 218.903C179.328 218.189 181.464 214.882 181.464 206.613C181.464 198.109 176.915 195.24 176.163 194.825L154.069 193.839L138.443 193.142C138.132 193.131 137.891 192.871 137.891 192.566C137.891 192.555 137.891 192.549 137.891 192.543C137.903 192.226 138.178 191.978 138.489 191.99L153.725 192.67L163.58 170.078C163.856 169.081 167.531 154.826 152.318 150.067C152.295 150.061 150.181 149.41 147.54 149.41Z"
                                            fill="black"></path>
                                        <path
                                            d="M144.507 237.197C144.358 237.197 144.215 237.14 144.105 237.03C143.996 236.921 143.933 236.777 143.933 236.621V220.505C143.933 220.188 144.192 219.929 144.507 219.929C144.823 219.929 145.082 220.188 145.082 220.505V236.033L211.753 234.852C211.943 228.923 213.625 176.957 213.821 164.615C213.981 154.619 210.605 150.891 208.801 150.315C208.778 150.309 208.75 150.297 208.732 150.286L196.413 144.599C196.39 148.874 195.248 151.542 193.008 152.539C186.983 155.212 175.147 144.363 173.326 142.64C157.326 145.89 152.927 149.894 152.881 149.934C152.651 150.153 152.289 150.142 152.071 149.911C151.853 149.681 151.864 149.318 152.088 149.099C152.272 148.926 156.729 144.795 173.389 141.453C173.573 141.418 173.763 141.47 173.901 141.603C173.935 141.632 177.214 144.789 181.183 147.572C186.306 151.162 190.234 152.51 192.543 151.484C194.472 150.626 195.385 148.01 195.253 143.712C195.248 143.51 195.345 143.326 195.512 143.216C195.678 143.107 195.891 143.089 196.069 143.176L209.18 149.231C209.783 149.439 215.176 151.646 214.969 164.638C214.763 177.678 212.902 234.869 212.885 235.446C212.873 235.751 212.626 235.999 212.322 236.005L144.519 237.209C144.513 237.197 144.513 237.197 144.507 237.197Z"
                                            fill="black"></path>
                                        <path
                                            d="M221.281 232.225C221.068 232.225 220.862 232.104 220.764 231.902L212.46 214.789C212.322 214.501 212.437 214.161 212.724 214.017C213.011 213.879 213.355 214 213.493 214.282L221.574 230.94L286.384 208.63L287.275 186.701L236.219 198.265C235.943 198.328 235.662 198.178 235.558 197.913C235.443 197.625 224.21 169.017 217.433 155.783C214.596 150.24 209.686 150.534 209.479 150.545C209.151 150.568 208.887 150.332 208.864 150.015C208.841 149.698 209.077 149.421 209.393 149.398C209.628 149.381 215.262 149.012 218.461 155.258C224.79 167.617 234.972 193.281 236.454 197.031L287.763 185.41C287.941 185.37 288.119 185.416 288.257 185.531C288.395 185.646 288.469 185.819 288.463 185.998L287.527 209.074C287.516 209.31 287.367 209.517 287.143 209.598L221.482 232.202C221.407 232.213 221.344 232.225 221.281 232.225Z"
                                            fill="black"></path>
                                        <path
                                            d="M293.54 235.417H182.09C180.637 235.417 179.454 234.236 179.454 232.772C179.454 231.314 180.631 230.127 182.09 230.127H293.54C294.993 230.127 296.176 231.309 296.176 232.772C296.176 234.236 294.993 235.417 293.54 235.417Z"
                                            fill="white"></path>
                                        <path
                                            d="M293.54 235.993H182.09C180.321 235.993 178.88 234.547 178.88 232.772C178.88 230.997 180.321 229.551 182.09 229.551H293.54C295.309 229.551 296.751 230.997 296.751 232.772C296.751 234.547 295.309 235.993 293.54 235.993ZM182.09 230.709C180.953 230.709 180.028 231.637 180.028 232.778C180.028 233.919 180.953 234.846 182.09 234.846H293.54C294.678 234.846 295.602 233.919 295.602 232.778C295.602 231.637 294.678 230.709 293.54 230.709H182.09Z"
                                            fill="black"></path>
                                        <path
                                            d="M296.349 231.649H219.667C217.508 231.649 215.917 229.626 216.417 227.523L227.346 181.33C227.702 179.821 229.051 178.749 230.596 178.749H307.278C309.437 178.749 311.028 180.772 310.528 182.875L299.599 229.067C299.243 230.583 297.899 231.649 296.349 231.649Z"
                                            fill="white"></path>
                                        <path
                                            d="M296.349 232.225H219.667C218.461 232.225 217.341 231.683 216.595 230.732C215.848 229.782 215.578 228.566 215.854 227.391L226.783 181.198C227.202 179.418 228.77 178.173 230.596 178.173H307.278C308.484 178.173 309.604 178.715 310.35 179.665C311.097 180.616 311.367 181.832 311.091 183.007L300.162 229.2C299.737 230.98 298.169 232.225 296.349 232.225ZM230.596 179.325C229.31 179.325 228.201 180.201 227.903 181.463L216.974 227.656C216.778 228.485 216.968 229.35 217.496 230.018C218.025 230.686 218.817 231.072 219.667 231.072H296.349C297.635 231.072 298.744 230.197 299.042 228.935L309.971 182.742C310.166 181.912 309.977 181.048 309.449 180.38C308.92 179.711 308.128 179.325 307.278 179.325H230.596Z"
                                            fill="black"></path>
                                        <path
                                            d="M181.458 218.01C181.143 218.01 180.884 217.751 180.884 217.434C180.884 217.117 181.143 216.858 181.458 216.858L202.271 216.846C203.351 216.846 204.23 216.011 204.23 214.991V214.801C204.23 213.775 203.351 212.946 202.271 212.946H196.925C196.609 212.946 196.35 212.686 196.35 212.369C196.35 212.053 196.609 211.793 196.925 211.793H202.271C203.351 211.793 204.23 210.958 204.23 209.938V209.627C204.23 208.601 203.351 207.772 202.271 207.772H197.005C196.689 207.772 196.431 207.512 196.431 207.195C196.431 206.878 196.689 206.619 197.005 206.619H202.271C203.351 206.619 204.23 205.784 204.23 204.764C204.23 203.744 203.351 202.909 202.271 202.909H196.838C196.523 202.909 196.264 202.649 196.264 202.332C196.264 202.015 196.523 201.756 196.838 201.756H202.271C203.351 201.756 204.23 200.921 204.23 199.901V199.745C204.23 198.72 203.351 197.89 202.271 197.89H191.141C190.946 197.89 190.762 197.792 190.659 197.625C190.555 197.458 190.538 197.25 190.619 197.072C190.642 197.02 193.048 191.708 192.221 187.991C191.687 185.589 190.55 184.678 189.671 184.851C188.781 185.018 188.023 186.263 188.304 188.055C189.315 194.531 184.933 197.729 184.743 197.861C184.646 197.93 184.531 197.965 184.41 197.965H179.448C179.132 197.965 178.874 197.706 178.874 197.389C178.874 197.072 179.132 196.813 179.448 196.813H184.221C184.927 196.242 187.988 193.436 187.173 188.227C186.771 185.652 188.051 183.981 189.459 183.716C190.785 183.462 192.594 184.367 193.347 187.743C194.059 190.959 192.686 195.021 192.008 196.738H202.271C203.983 196.738 205.378 198.086 205.378 199.745V199.901C205.378 200.898 204.873 201.785 204.098 202.332C204.873 202.88 205.378 203.767 205.378 204.764C205.378 205.761 204.873 206.648 204.098 207.195C204.873 207.743 205.378 208.63 205.378 209.627V209.938C205.378 210.935 204.873 211.822 204.098 212.369C204.873 212.917 205.378 213.804 205.378 214.801V214.991C205.378 216.651 203.983 217.999 202.271 217.999L181.458 218.01Z"
                                            fill="black"></path>
                                        <path
                                            d="M173.504 142.594C173.274 142.594 173.056 142.455 172.97 142.225C172.855 141.931 173.004 141.597 173.297 141.482L176.427 140.266V126.76C176.427 126.443 176.686 126.184 177.002 126.184C177.317 126.184 177.576 126.443 177.576 126.76V140.658C177.576 140.894 177.432 141.107 177.208 141.194L173.717 142.553C173.648 142.582 173.573 142.594 173.504 142.594Z"
                                            fill="black"></path>
                                        <path
                                            d="M195.828 144.265C195.742 144.265 195.65 144.247 195.569 144.201L191.813 142.294C191.618 142.196 191.498 142 191.498 141.781V135.305C191.498 134.988 191.756 134.729 192.072 134.729C192.388 134.729 192.646 134.988 192.646 135.305V141.43L196.086 143.181C196.368 143.325 196.483 143.671 196.339 143.954C196.241 144.149 196.04 144.265 195.828 144.265Z"
                                            fill="black"></path>
                                        <path
                                            d="M120.743 58.2982C120.582 58.2982 120.421 58.229 120.312 58.1023C120.163 57.9352 120.128 57.6932 120.22 57.4858L125.532 45.5934C125.613 45.4147 125.779 45.288 125.969 45.2592L155.793 40.7131L129.151 38.8808C128.938 38.8635 128.749 38.7368 128.662 38.5409C128.576 38.345 128.605 38.1203 128.737 37.9474L133.504 31.9321C133.636 31.765 133.843 31.6901 134.049 31.7246L179.156 39.5204C179.42 39.5665 179.615 39.7854 179.632 40.0505C179.65 40.3155 179.477 40.5575 179.225 40.6382L120.898 58.2751C120.858 58.2867 120.8 58.2982 120.743 58.2982ZM126.457 46.3482L121.782 56.8059L176.571 40.2406L134.199 32.9173L130.322 37.8091L161.088 39.9237C161.381 39.941 161.611 40.183 161.622 40.4768C161.633 40.7707 161.427 41.0242 161.134 41.0703L126.457 46.3482Z"
                                            fill="black"></path>
                                        <path
                                            d="M132.389 45.4378C132.177 45.4378 131.97 45.3168 131.872 45.1151L128.679 38.5582C128.541 38.2701 128.656 37.9244 128.943 37.7861C129.231 37.6478 129.569 37.763 129.713 38.0511L132.906 44.6081C133.044 44.8962 132.929 45.2419 132.642 45.3802C132.562 45.4205 132.475 45.4378 132.389 45.4378Z"
                                            fill="black"></path>
                                        <path
                                            d="M136.961 58.2982C136.794 58.2982 136.634 58.229 136.525 58.0965L133.228 54.19C133.021 53.948 133.056 53.585 133.297 53.3776C133.538 53.1702 133.9 53.2047 134.107 53.4467L137.128 57.0306L178.851 39.555C179.144 39.434 179.483 39.5722 179.603 39.8661C179.724 40.1599 179.586 40.4999 179.293 40.6209L137.185 58.2579C137.11 58.2809 137.036 58.2982 136.961 58.2982Z"
                                            fill="black"></path>
                                        <path
                                            d="M72.5353 237.197C72.2769 237.197 72.0357 237.019 71.9783 236.754L65.9308 210.589C65.8906 210.416 65.9308 210.238 66.0399 210.099C66.149 209.961 66.3156 209.88 66.4879 209.88H79.8405C80.1564 209.88 80.4148 210.14 80.4148 210.457C80.4148 210.773 80.1564 211.033 79.8405 211.033H67.2115L73.0982 236.489C73.1671 236.8 72.9776 237.111 72.6674 237.18C72.6215 237.191 72.5755 237.197 72.5353 237.197Z"
                                            fill="black"></path>
                                        <path
                                            d="M85.5548 237.197C85.5146 237.197 85.4687 237.191 85.4227 237.18C85.1126 237.111 84.9231 236.8 84.992 236.489L90.8787 211.033H78.2496C77.9337 211.033 77.6753 210.773 77.6753 210.457C77.6753 210.14 77.9337 209.88 78.2496 209.88H91.6023C91.7803 209.88 91.9411 209.961 92.0502 210.099C92.1594 210.238 92.1996 210.416 92.1594 210.589L86.1119 236.754C86.0487 237.013 85.8132 237.197 85.5548 237.197Z"
                                            fill="black"></path>
                                        <path
                                            d="M192.812 135.91C185.082 135.91 173.073 124.121 170.862 121.88C170.081 122.283 168.772 122.456 167.428 121.189C167.336 121.102 167.238 121.016 167.129 120.918C166.038 119.927 163.999 118.089 164.327 114.597C164.499 112.747 165.113 111.37 166.015 110.823C166.503 110.523 167.049 110.483 167.583 110.708C169.3 111.411 171.207 114.13 172.47 115.928C172.821 116.429 173.154 116.902 173.297 117.052C173.854 117.633 174.279 117.801 174.452 117.714C174.745 117.564 175.066 116.596 174.693 114.66C174.153 111.86 176.519 111.198 179.023 110.495C183.641 109.198 190.613 107.239 189.522 91.6764C189.51 91.4748 189.596 91.2846 189.763 91.1694C189.924 91.0542 190.136 91.0311 190.32 91.106C190.785 91.3019 201.685 96.0439 203.908 106.744C205.729 115.513 201.117 134.326 194.168 135.783C193.731 135.87 193.278 135.91 192.812 135.91ZM170.943 120.566C171.092 120.566 171.241 120.624 171.356 120.739C171.506 120.895 186.38 136.233 193.932 134.648C196.626 134.083 199.365 129.964 201.255 123.632C203.041 117.651 203.638 111.111 202.782 106.974C201.042 98.5618 193.329 93.9236 190.728 92.5753C191.52 108.173 184.209 110.23 179.333 111.601C176.479 112.402 175.508 112.828 175.819 114.441C176.249 116.671 175.945 118.238 174.98 118.74C174.567 118.959 173.688 119.126 172.465 117.852C172.264 117.639 171.953 117.201 171.528 116.596C170.489 115.116 168.554 112.356 167.147 111.779C166.951 111.699 166.785 111.71 166.607 111.814C166.182 112.073 165.63 112.984 165.47 114.712C165.2 117.633 166.825 119.103 167.899 120.071C168.014 120.174 168.117 120.267 168.215 120.359C169.49 121.563 170.455 120.802 170.564 120.71C170.673 120.612 170.805 120.566 170.943 120.566Z"
                                            fill="black"></path>
                                        <path
                                            d="M203.736 108.582C203.736 108.582 221.074 98.4812 209.341 84.9812C203.822 78.6317 197.326 77.6637 191.428 78.4185C186.753 79.0177 181.539 83.0971 181.539 83.0971C181.539 83.0971 174.199 83.5408 169.335 87.4934C163.879 91.9242 161.047 100.313 166.899 111.105L167.353 110.904L168.077 111.422L169.122 112.119L170.139 113.105L171.184 114.781L172.643 116.717L173.297 117.53L174.262 118.002L174.968 117.633L175.434 116.112L174.968 113.629L175.75 112.269L177.524 111.416L180.999 110.345L184.462 108.922L187.04 106.144L188.993 102.929L189.774 99.7142L190.015 95.946V91.3423L194.242 93.6989L197.608 96.3666L201.048 100.63L202.926 104.214L203.736 107.458V108.582Z"
                                            fill="black"></path>
                                        <path
                                            d="M174.262 118.578C174.176 118.578 174.09 118.561 174.01 118.521L173.045 118.048C172.97 118.014 172.901 117.956 172.849 117.893L172.2 117.08L170.73 115.133L169.696 113.473L168.766 112.575L167.29 111.566L167.135 111.635C166.865 111.756 166.544 111.647 166.4 111.382C163.609 106.237 162.569 101.339 163.316 96.8218C163.959 92.9152 165.918 89.5331 168.979 87.0497C173.562 83.3218 180.143 82.6361 181.332 82.5382C182.222 81.8641 186.96 78.4127 191.359 77.8481C198.957 76.8743 204.982 79.0869 209.777 84.6009C213.126 88.4498 214.492 92.414 213.838 96.3896C212.58 104.018 204.379 108.876 204.034 109.077C203.856 109.181 203.638 109.181 203.46 109.077C203.282 108.973 203.173 108.783 203.173 108.576V107.521L202.392 104.416L200.571 100.941L197.206 96.7699L193.927 94.1713L190.596 92.316V95.9402L190.354 99.743C190.354 99.7776 190.349 99.8122 190.337 99.841L189.556 103.056C189.545 103.114 189.522 103.171 189.487 103.217L187.534 106.432C187.512 106.467 187.489 106.496 187.466 106.525L184.887 109.302C184.829 109.365 184.761 109.411 184.686 109.44L181.223 110.863L177.743 111.941L176.169 112.696L175.583 113.715L176.008 115.991C176.025 116.084 176.02 116.176 175.991 116.268L175.526 117.789C175.48 117.939 175.376 118.06 175.239 118.129L174.532 118.498C174.446 118.555 174.354 118.578 174.262 118.578ZM173.665 117.069L174.256 117.357L174.492 117.236L174.842 116.084L174.406 113.738C174.383 113.6 174.406 113.462 174.475 113.347L175.256 111.987C175.313 111.889 175.399 111.803 175.503 111.756L177.277 110.904C177.3 110.892 177.329 110.881 177.358 110.875L180.832 109.803L184.129 108.449L186.581 105.804L188.459 102.716L189.206 99.6335L189.441 95.9172V91.348C189.441 91.1464 189.55 90.9562 189.723 90.8525C189.901 90.7488 190.113 90.7488 190.291 90.8468L194.518 93.2033C194.547 93.2206 194.57 93.2379 194.593 93.2552L197.958 95.9229C197.993 95.9517 198.021 95.9805 198.05 96.0151L201.49 100.279C201.513 100.308 201.536 100.342 201.553 100.371L203.431 103.955C203.454 103.995 203.472 104.036 203.477 104.082L204.287 107.326C204.299 107.372 204.304 107.418 204.304 107.464V107.533C206.418 106.081 211.759 101.898 212.689 96.2053C213.281 92.5926 212.006 88.9453 208.899 85.3673C204.373 80.1643 198.682 78.0785 191.491 79.0004C187.035 79.5709 181.935 83.5235 181.883 83.5638C181.791 83.6329 181.682 83.679 181.567 83.6848C181.499 83.6906 174.348 84.1688 169.691 87.9543C163.408 93.0593 162.472 101.414 167.152 110.379C167.33 110.31 167.531 110.339 167.686 110.448L168.41 110.967L169.438 111.653C169.467 111.67 169.495 111.693 169.518 111.716L170.535 112.701C170.569 112.736 170.598 112.771 170.621 112.811L171.666 114.488L173.665 117.069Z"
                                            fill="black"></path>
                                        <path
                                            d="M204.362 119.731C200.474 119.731 197.304 116.556 197.304 112.65C197.304 108.743 200.468 105.568 204.362 105.568C208.256 105.568 211.42 108.743 211.42 112.65C211.42 116.556 208.256 119.731 204.362 119.731ZM204.362 106.726C201.106 106.726 198.452 109.383 198.452 112.655C198.452 115.928 201.1 118.584 204.362 118.584C207.624 118.584 210.272 115.928 210.272 112.655C210.272 109.383 207.624 106.726 204.362 106.726Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M188.419 119.731C184.192 119.731 180.752 116.279 180.752 112.039C180.752 107.798 184.192 104.347 188.419 104.347C192.646 104.347 196.086 107.798 196.086 112.039C196.086 116.279 192.646 119.731 188.419 119.731ZM188.419 105.499C184.824 105.499 181.901 108.432 181.901 112.039C181.901 115.646 184.824 118.578 188.419 118.578C192.014 118.578 194.937 115.646 194.937 112.039C194.937 108.432 192.014 105.499 188.419 105.499Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M197.774 113.629H196.126C195.81 113.629 195.552 113.37 195.552 113.053C195.552 112.736 195.81 112.477 196.126 112.477H197.774C198.09 112.477 198.349 112.736 198.349 113.053C198.349 113.37 198.096 113.629 197.774 113.629Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M189.775 113.629C189.177 113.629 188.695 113.145 188.695 112.546C188.695 111.947 189.177 111.463 189.775 111.463C190.372 111.463 190.854 111.947 190.854 112.546C190.854 113.139 190.366 113.629 189.775 113.629ZM189.775 112.477C189.734 112.477 189.706 112.505 189.706 112.546C189.706 112.621 189.843 112.621 189.843 112.546C189.843 112.505 189.809 112.477 189.775 112.477Z"
                                            fill="black"></path>
                                        <path
                                            d="M199.888 113.629C199.291 113.629 198.808 113.145 198.808 112.546C198.808 111.947 199.291 111.463 199.888 111.463C200.485 111.463 200.967 111.947 200.967 112.546C200.967 113.139 200.485 113.629 199.888 113.629ZM199.888 112.477C199.848 112.477 199.819 112.505 199.819 112.546C199.819 112.621 199.957 112.621 199.957 112.546C199.957 112.505 199.928 112.477 199.888 112.477Z"
                                            fill="black"></path>
                                        <path
                                            d="M79.0879 210.802C79.0591 210.802 79.0247 210.802 78.996 210.796C74.9528 210.14 71.5414 206.573 68.8479 200.195C66.8838 195.533 66.074 191.131 66.0396 190.941C65.9994 190.717 66.0913 190.492 66.2808 190.365C66.4646 190.233 66.7115 190.227 66.901 190.348C74.4991 194.963 78.9385 199.757 80.1044 204.608C80.9716 208.204 79.6277 210.439 79.5703 210.531C79.4726 210.704 79.2831 210.802 79.0879 210.802ZM67.4524 192.042C68.3828 196.052 71.731 207.99 78.7605 209.575C79.4209 207.95 81.2243 200.834 67.4524 192.042Z"
                                            fill="black"></path>
                                        <path
                                            d="M80.5752 210.802C80.3799 210.802 80.1904 210.699 80.087 210.532C80.0296 210.439 78.6915 208.204 79.5529 204.608C80.7188 199.757 85.1639 194.963 92.7563 190.348C92.9516 190.233 93.1928 190.238 93.3765 190.365C93.5603 190.492 93.658 190.722 93.6178 190.941C93.5833 191.126 92.7735 195.528 90.8094 200.195C88.1216 206.573 84.7045 210.14 80.6614 210.797C80.6326 210.802 80.6039 210.802 80.5752 210.802ZM92.2107 192.042C84.1646 197.181 81.5171 201.693 80.736 204.62C80.0641 207.12 80.5924 208.866 80.8968 209.575C87.9321 208.002 91.2803 196.058 92.2107 192.042Z"
                                            fill="black"></path>
                                        <path
                                            d="M79.8404 211.033C79.8174 211.033 79.8002 211.033 79.7772 211.027C79.4614 210.992 79.2316 210.71 79.2661 210.393L79.7772 205.686C80.7593 196.634 80.834 189.691 72.7879 182.713C72.5467 182.506 72.5237 182.143 72.7305 181.901C72.9372 181.659 73.299 181.636 73.5402 181.843C81.9941 189.172 81.9137 196.715 80.9258 205.813L80.4147 210.52C80.3745 210.814 80.1276 211.033 79.8404 211.033Z"
                                            fill="black"></path>
                                        <path
                                            d="M197.056 114.862H198.337C199.204 114.862 199.91 115.571 199.91 116.441C199.91 117.311 199.204 118.02 198.337 118.02H197.056"
                                            fill="white"></path>
                                        <path
                                            d="M198.332 118.308H197.051C196.89 118.308 196.764 118.181 196.764 118.02C196.764 117.858 196.89 117.731 197.051 117.731H198.332C199.044 117.731 199.618 117.149 199.618 116.441C199.618 115.732 199.038 115.15 198.332 115.15H197.051C196.89 115.15 196.764 115.023 196.764 114.862C196.764 114.701 196.89 114.574 197.051 114.574H198.332C199.36 114.574 200.192 115.409 200.192 116.441C200.192 117.472 199.36 118.308 198.332 118.308Z"
                                            fill="black"></path>
                                        <path
                                            d="M196.281 124.525C195.426 124.525 194.576 124.104 193.749 123.274C193.634 123.159 193.634 122.98 193.749 122.865C193.864 122.75 194.042 122.75 194.157 122.865C194.92 123.632 195.69 123.989 196.437 123.937C197.528 123.856 198.246 122.906 198.257 122.894C198.349 122.767 198.533 122.738 198.659 122.836C198.785 122.929 198.814 123.113 198.717 123.24C198.682 123.286 197.844 124.409 196.482 124.513C196.414 124.525 196.35 124.525 196.281 124.525Z"
                                            fill="black"></path>
                                        <path
                                            d="M128.995 136.48C128.714 136.48 128.467 136.273 128.427 135.979C128.386 135.662 128.605 135.374 128.921 135.334C131.028 135.046 132.234 134.746 132.246 134.746C132.556 134.671 132.866 134.856 132.941 135.167C133.015 135.478 132.832 135.789 132.521 135.864C132.47 135.875 131.246 136.181 129.07 136.48C129.047 136.48 129.024 136.48 128.995 136.48Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M117.641 136.936C117.63 136.936 117.624 136.936 117.612 136.936C115.327 136.826 113.018 136.601 110.755 136.261C110.439 136.215 110.227 135.922 110.273 135.605C110.319 135.294 110.612 135.08 110.928 135.121C113.15 135.455 115.419 135.68 117.664 135.783C117.98 135.801 118.227 136.071 118.21 136.388C118.204 136.694 117.946 136.936 117.641 136.936ZM99.7859 133.634C99.7285 133.634 99.6653 133.623 99.6079 133.605C97.437 132.885 95.2776 132.05 93.1871 131.11C92.9 130.978 92.7679 130.638 92.9 130.35C93.0321 130.062 93.3709 129.929 93.6581 130.062C95.7084 130.984 97.8333 131.808 99.9697 132.511C100.268 132.608 100.435 132.937 100.337 133.237C100.251 133.479 100.027 133.634 99.7859 133.634ZM83.4756 125.642C83.3665 125.642 83.2573 125.614 83.1597 125.544C81.276 124.283 79.4152 122.906 77.6291 121.442C77.3822 121.24 77.3477 120.877 77.5487 120.63C77.7497 120.382 78.1115 120.347 78.3585 120.549C80.1159 121.989 81.9479 123.343 83.8029 124.582C84.0671 124.761 84.136 125.118 83.9637 125.383C83.8431 125.556 83.6594 125.642 83.4756 125.642ZM69.7381 113.738C69.5831 113.738 69.428 113.675 69.3131 113.548C67.797 111.883 66.3038 110.114 64.8852 108.282C64.69 108.029 64.7359 107.671 64.9829 107.475C65.2356 107.279 65.5916 107.326 65.7869 107.573C67.1882 109.377 68.6584 111.128 70.1574 112.771C70.3699 113.007 70.3526 113.37 70.1229 113.583C70.0195 113.687 69.876 113.738 69.7381 113.738ZM58.8952 99.115C58.6999 99.115 58.5104 99.017 58.407 98.8384C57.2412 96.9197 56.1041 94.9088 55.0186 92.8576C54.8693 92.5753 54.9784 92.2296 55.2598 92.0798C55.5412 91.93 55.8858 92.0394 56.0351 92.3218C57.1091 94.3557 58.2347 96.3435 59.3891 98.2449C59.5556 98.5157 59.4695 98.873 59.1996 99.0343C59.0962 99.0919 58.9928 99.115 58.8952 99.115ZM50.6596 82.8551C50.4356 82.8551 50.2231 82.7226 50.1312 82.5036C49.264 80.4409 48.4141 78.2917 47.6158 76.1138C47.5067 75.8141 47.656 75.4857 47.9546 75.3762C48.2533 75.2668 48.5806 75.4166 48.6897 75.7162C49.4823 77.8769 50.3265 80.0088 51.188 82.06C51.3086 82.3538 51.1765 82.6938 50.8836 82.8148C50.8089 82.8378 50.7343 82.8551 50.6596 82.8551ZM44.2388 65.7713C44.0149 65.7713 43.7966 65.633 43.7047 65.414C42.8375 63.2764 41.9129 61.1791 40.9538 59.1855C40.816 58.8974 40.9366 58.5517 41.2237 58.4192C41.5109 58.2809 41.8555 58.4019 41.9876 58.69C42.9581 60.7066 43.8943 62.827 44.7672 64.9819C44.8878 65.2758 44.7442 65.6157 44.4513 65.7309C44.3824 65.754 44.3078 65.7713 44.2388 65.7713ZM35.6013 62.2738C33.7979 62.2738 32.0348 62.2335 30.3693 62.1644C30.0534 62.1528 29.8065 61.882 29.8237 61.5651C29.8409 61.2482 30.1109 61.0062 30.421 61.0178C32.5574 61.1157 34.8259 61.1445 37.2151 61.1215H37.2208C37.5367 61.1215 37.7894 61.375 37.7951 61.6919C37.8008 62.0088 37.5424 62.2738 37.2265 62.2738C36.681 62.2738 36.1354 62.2738 35.6013 62.2738ZM48.5864 61.7207C48.2877 61.7207 48.0408 61.4902 48.0121 61.1906C47.9891 60.8737 48.2245 60.5972 48.5404 60.5683C50.7228 60.3955 53.0028 60.1823 55.323 59.9288C55.6331 59.8942 55.9203 60.1247 55.9547 60.4416C55.9892 60.7585 55.7595 61.0408 55.4436 61.0754C53.1119 61.3289 50.8204 61.5479 48.6266 61.7207C48.6151 61.7207 48.5978 61.7207 48.5864 61.7207ZM19.1014 60.9025C19.0669 60.9025 19.0267 60.8968 18.9923 60.891C16.5514 60.4128 14.3116 59.802 12.3303 59.076C12.0316 58.9666 11.8766 58.6381 11.9857 58.3385C12.0948 58.0389 12.4222 57.8833 12.7208 57.9928C14.6447 58.6957 16.8329 59.2892 19.2105 59.7559C19.5206 59.8193 19.7274 60.1189 19.6642 60.4301C19.6125 60.7124 19.3713 60.9025 19.1014 60.9025ZM66.6656 59.6119C66.3842 59.6119 66.143 59.4045 66.097 59.1221C66.0511 58.8052 66.2693 58.5171 66.5794 58.4653C68.7675 58.1369 71.0303 57.7796 73.3103 57.3936C73.6262 57.3417 73.9191 57.5549 73.9708 57.866C74.0225 58.1772 73.81 58.4768 73.4999 58.5287C71.2141 58.9147 68.9398 59.2777 66.746 59.6061C66.723 59.6119 66.6943 59.6119 66.6656 59.6119ZM84.607 56.489C84.3371 56.489 84.0958 56.2988 84.0441 56.0223C83.981 55.7111 84.1877 55.4057 84.4979 55.3481C86.663 54.9217 88.9143 54.4666 91.1828 53.9883C91.4929 53.925 91.7973 54.1209 91.8605 54.432C91.9237 54.7431 91.7284 55.0485 91.4183 55.1119C89.144 55.5901 86.887 56.0453 84.7161 56.4717C84.6759 56.489 84.6414 56.489 84.607 56.489ZM3.17581 52.8878C3.00352 52.8878 2.83697 52.8129 2.72211 52.6689C1.22891 50.7502 0.315755 48.5607 -0.000114081 46.1522C-0.0403157 45.8353 0.177921 45.5473 0.493791 45.5069C0.803917 45.4666 1.09681 45.6855 1.13702 46.0024C1.42417 48.2035 2.26266 50.2086 3.62377 51.9602C3.81904 52.2137 3.77309 52.5709 3.52614 52.7668C3.42851 52.8475 3.30216 52.8878 3.17581 52.8878ZM35.9344 49.546C35.7448 49.546 35.5611 49.4538 35.4519 49.2809C34.1885 47.3219 32.8675 45.4608 31.5237 43.7496C31.3284 43.5018 31.3686 43.1388 31.6213 42.9429C31.8682 42.747 32.2301 42.7873 32.4253 43.0409C33.7922 44.7809 35.1361 46.6708 36.4168 48.6586C36.5891 48.9237 36.5144 49.2809 36.2445 49.4538C36.1468 49.5114 36.0377 49.546 35.9344 49.546ZM24.0806 35.7752C23.9543 35.7752 23.8222 35.7349 23.7188 35.6484C21.8466 34.1215 19.9743 32.8712 18.1423 31.9378C17.8609 31.7938 17.746 31.4481 17.8896 31.1657C18.0332 30.8834 18.3778 30.7682 18.6592 30.9122C20.5601 31.8802 22.507 33.1766 24.4424 34.7553C24.6894 34.957 24.7239 35.32 24.5228 35.5678C24.408 35.7003 24.2472 35.7752 24.0806 35.7752ZM2.92886 35.6657C2.83697 35.6657 2.74508 35.6427 2.65893 35.5966C2.37752 35.4468 2.27415 35.0953 2.42347 34.8187C2.99203 33.7586 3.63526 32.7618 4.28423 31.9378C5.08251 30.9237 6.07032 30.1459 7.22468 29.6216C7.51184 29.489 7.85642 29.6216 7.98277 29.9096C8.11486 30.1977 7.98277 30.5435 7.69562 30.6702C6.70781 31.1196 5.86357 31.7822 5.18015 32.6523C4.57712 33.4186 3.9741 34.3578 3.43425 35.3603C3.33087 35.5562 3.13561 35.6657 2.92886 35.6657Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M102.554 52.6458C102.29 52.6458 102.054 52.4672 101.997 52.1964C101.928 51.8853 102.118 51.5799 102.428 51.505C103.536 51.2515 104.65 50.9864 105.782 50.7214C106.086 50.6465 106.402 50.8424 106.471 51.1478C106.546 51.4589 106.35 51.77 106.046 51.8392C104.915 52.1042 103.795 52.3693 102.686 52.6228C102.64 52.6401 102.6 52.6458 102.554 52.6458Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M205.619 185.243C205.504 185.243 205.384 185.208 205.286 185.139L200.06 181.417C199.911 181.307 199.819 181.135 199.819 180.944V171.737C199.819 171.42 200.077 171.161 200.393 171.161H210.846C211.161 171.161 211.42 171.42 211.42 171.737V180.944C211.42 181.129 211.328 181.307 211.179 181.417L205.952 185.139C205.855 185.208 205.74 185.243 205.619 185.243ZM200.967 180.651L205.619 183.964L210.271 180.651V172.313H200.967V180.651Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M247.671 120.826C247.527 120.826 247.384 120.768 247.269 120.664C247.096 120.497 247.045 120.238 247.142 120.019L251.237 110.748C245.77 110.304 241.462 105.701 241.462 100.106V72.8007C241.462 66.9121 246.235 62.124 252.104 62.124H302.689C308.559 62.124 313.331 66.9121 313.331 72.8007V100.106C313.331 105.995 308.559 110.783 302.689 110.783H268.455L247.918 120.774C247.843 120.808 247.757 120.826 247.671 120.826ZM252.104 63.2706C246.867 63.2706 242.611 67.5459 242.611 72.7949V100.1C242.611 105.355 246.872 109.625 252.104 109.625C252.3 109.625 252.478 109.723 252.587 109.884C252.69 110.045 252.707 110.253 252.633 110.431L248.831 119.039L268.076 109.676C268.156 109.636 268.237 109.619 268.329 109.619H302.695C307.933 109.619 312.188 105.344 312.188 100.094V72.7892C312.188 67.5344 307.927 63.2649 302.695 63.2649H252.104V63.2706Z"
                                            fill="black"></path>
                                        <path
                                            d="M279.131 100.486C272.739 100.486 267.151 96.1419 265.543 89.9249C265.244 88.761 265.089 87.5683 265.089 86.3813C265.089 79.9684 269.419 74.3622 275.616 72.7489C278.78 71.9249 282.192 72.2533 285.132 73.6477C285.419 73.786 285.54 74.1259 285.408 74.414C285.27 74.7021 284.931 74.8231 284.644 74.6906C281.945 73.4115 278.809 73.1119 275.903 73.8667C270.212 75.3474 266.237 80.4928 266.237 86.3813C266.237 87.4761 266.375 88.5708 266.651 89.6368C268.127 95.3467 273.256 99.3339 279.125 99.3339C280.216 99.3339 281.307 99.1956 282.37 98.9191C288.061 97.4383 292.035 92.293 292.035 86.4044C292.035 85.3096 291.898 84.2149 291.622 83.149C291.599 83.051 291.57 82.9473 291.542 82.8493C291.455 82.544 291.633 82.2271 291.938 82.1406C292.242 82.0542 292.558 82.2328 292.644 82.5382C292.673 82.6477 292.702 82.7514 292.73 82.8609C293.029 84.0248 293.184 85.2175 293.184 86.4044C293.184 92.8173 288.854 98.4236 282.663 100.037C281.503 100.331 280.314 100.486 279.131 100.486Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M278.287 90.0286C278.137 90.0286 277.994 89.971 277.885 89.8615L272.383 84.4511C272.159 84.2264 272.153 83.8634 272.377 83.6387C272.601 83.414 272.963 83.4082 273.187 83.6329L278.269 88.6285L290.474 75.5721C290.692 75.3417 291.054 75.3301 291.283 75.5433C291.513 75.7623 291.524 76.1253 291.312 76.3558L278.706 89.8384C278.603 89.9537 278.453 90.0171 278.298 90.0228C278.298 90.0286 278.292 90.0286 278.287 90.0286Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M310.879 190.094H299.95C298.554 190.094 297.423 188.959 297.423 187.559C297.423 186.159 298.554 185.024 299.95 185.024H310.879C312.274 185.024 313.406 186.159 313.406 187.559C313.4 188.959 312.269 190.094 310.879 190.094Z"
                                            fill="white"></path>
                                        <path
                                            d="M310.879 190.67H299.95C298.238 190.67 296.849 189.276 296.849 187.559C296.849 185.842 298.238 184.448 299.95 184.448H310.879C312.59 184.448 313.98 185.842 313.98 187.559C313.98 189.276 312.585 190.67 310.879 190.67ZM299.95 185.606C298.876 185.606 297.997 186.482 297.997 187.565C297.997 188.642 298.87 189.524 299.95 189.524H310.879C311.953 189.524 312.832 188.648 312.832 187.565C312.832 186.487 311.959 185.606 310.879 185.606H299.95Z"
                                            fill="black"></path>
                                        <path
                                            d="M310.149 195.165H299.22C297.825 195.165 296.693 194.03 296.693 192.629C296.693 191.229 297.825 190.094 299.22 190.094H310.149C311.545 190.094 312.676 191.229 312.676 192.629C312.676 194.03 311.545 195.165 310.149 195.165Z"
                                            fill="white"></path>
                                        <path
                                            d="M310.149 195.741H299.22C297.509 195.741 296.119 194.346 296.119 192.629C296.119 190.912 297.509 189.518 299.22 189.518H310.149C311.861 189.518 313.251 190.912 313.251 192.629C313.251 194.346 311.861 195.741 310.149 195.741ZM299.226 190.67C298.152 190.67 297.274 191.546 297.274 192.629C297.274 193.713 298.146 194.588 299.226 194.588H310.155C311.229 194.588 312.108 193.713 312.108 192.629C312.108 191.546 311.235 190.67 310.155 190.67H299.226Z"
                                            fill="black"></path>
                                        <path
                                            d="M309.11 200.229H298.181C296.785 200.229 295.654 199.094 295.654 197.694C295.654 196.294 296.785 195.159 298.181 195.159H309.11C310.505 195.159 311.637 196.294 311.637 197.694C311.631 199.094 310.505 200.229 309.11 200.229Z"
                                            fill="white"></path>
                                        <path
                                            d="M309.11 200.805H298.181C296.469 200.805 295.08 199.411 295.08 197.694C295.08 195.977 296.469 194.583 298.181 194.583H309.11C310.821 194.583 312.211 195.977 312.211 197.694C312.211 199.411 310.816 200.805 309.11 200.805ZM298.181 195.741C297.107 195.741 296.228 196.617 296.228 197.7C296.228 198.777 297.101 199.659 298.181 199.659H309.11C310.184 199.659 311.063 198.783 311.063 197.7C311.063 196.622 310.19 195.741 309.11 195.741H298.181Z"
                                            fill="black"></path>
                                        <path
                                            d="M308.099 205.3H297.17C295.774 205.3 294.643 204.165 294.643 202.765C294.643 201.364 295.774 200.229 297.17 200.229H308.099C309.495 200.229 310.626 201.364 310.626 202.765C310.62 204.165 309.489 205.3 308.099 205.3Z"
                                            fill="white"></path>
                                        <path
                                            d="M308.099 205.876H297.17C295.459 205.876 294.069 204.482 294.069 202.765C294.069 201.047 295.459 199.653 297.17 199.653H308.099C309.811 199.653 311.2 201.047 311.2 202.765C311.2 204.482 309.805 205.876 308.099 205.876ZM297.17 200.805C296.096 200.805 295.217 201.681 295.217 202.765C295.217 203.842 296.09 204.724 297.17 204.724H308.099C309.173 204.724 310.052 203.848 310.052 202.765C310.052 201.687 309.179 200.805 308.099 200.805H297.17Z"
                                            fill="black"></path>
                                        <path
                                            d="M306.658 164.414C306.342 164.414 306.083 164.154 306.083 163.838V154.889C306.083 154.573 306.342 154.313 306.658 154.313C306.974 154.313 307.232 154.573 307.232 154.889V163.838C307.232 164.154 306.974 164.414 306.658 164.414Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M315.456 172.313C315.307 172.313 315.163 172.256 315.048 172.146C314.824 171.921 314.824 171.558 315.048 171.334L326.557 159.793C326.781 159.568 327.143 159.568 327.367 159.793C327.591 160.017 327.591 160.38 327.367 160.605L315.858 172.146C315.749 172.256 315.6 172.313 315.456 172.313Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M330.285 181.521H321.211C320.895 181.521 320.636 181.261 320.636 180.944C320.636 180.628 320.895 180.368 321.211 180.368H330.285C330.6 180.368 330.859 180.628 330.859 180.944C330.859 181.261 330.6 181.521 330.285 181.521Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M119.06 82.1349C118.744 82.1349 118.485 81.8756 118.485 81.5587V78.3897C118.485 78.0728 118.744 77.8135 119.06 77.8135C119.376 77.8135 119.634 78.0728 119.634 78.3897V81.5587C119.634 81.8756 119.376 82.1349 119.06 82.1349Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M119.06 90.3512C118.744 90.3512 118.485 90.092 118.485 89.7751V86.6061C118.485 86.2892 118.744 86.0299 119.06 86.0299C119.376 86.0299 119.634 86.2892 119.634 86.6061V89.7751C119.634 90.092 119.376 90.3512 119.06 90.3512Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M124.499 84.6182H121.34C121.024 84.6182 120.766 84.3589 120.766 84.042C120.766 83.7251 121.024 83.4659 121.34 83.4659H124.499C124.814 83.4659 125.073 83.7251 125.073 84.042C125.073 84.3589 124.814 84.6182 124.499 84.6182Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M116.596 84.6182H113.438C113.122 84.6182 112.863 84.3589 112.863 84.042C112.863 83.7251 113.122 83.4659 113.438 83.4659H116.596C116.912 83.4659 117.171 83.7251 117.171 84.042C117.171 84.3589 116.912 84.6182 116.596 84.6182Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M327.051 120.192C326.735 120.192 326.477 119.932 326.477 119.616V116.447C326.477 116.13 326.735 115.87 327.051 115.87C327.367 115.87 327.626 116.13 327.626 116.447V119.616C327.626 119.932 327.367 120.192 327.051 120.192Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M327.051 128.408C326.735 128.408 326.477 128.149 326.477 127.832V124.663C326.477 124.346 326.735 124.087 327.051 124.087C327.367 124.087 327.626 124.346 327.626 124.663V127.832C327.626 128.149 327.367 128.408 327.051 128.408Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M332.496 122.669H329.337C329.021 122.669 328.763 122.41 328.763 122.093C328.763 121.776 329.021 121.517 329.337 121.517H332.496C332.812 121.517 333.07 121.776 333.07 122.093C333.07 122.41 332.812 122.669 332.496 122.669Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M324.587 122.669H321.429C321.113 122.669 320.854 122.41 320.854 122.093C320.854 121.776 321.113 121.517 321.429 121.517H324.587C324.903 121.517 325.162 121.776 325.162 122.093C325.162 122.41 324.909 122.669 324.587 122.669Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M194.042 4.32137C193.726 4.32137 193.467 4.06209 193.467 3.74519V0.576183C193.467 0.259282 193.726 0 194.042 0C194.357 0 194.616 0.259282 194.616 0.576183V3.74519C194.616 4.06209 194.357 4.32137 194.042 4.32137Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M194.042 12.5377C193.726 12.5377 193.467 12.2785 193.467 11.9616V8.79255C193.467 8.47565 193.726 8.21637 194.042 8.21637C194.357 8.21637 194.616 8.47565 194.616 8.79255V11.9616C194.616 12.2842 194.357 12.5377 194.042 12.5377Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M199.486 6.80472H196.327C196.011 6.80472 195.753 6.54544 195.753 6.22854C195.753 5.91164 196.011 5.65236 196.327 5.65236H199.486C199.802 5.65236 200.06 5.91164 200.06 6.22854C200.06 6.54544 199.802 6.80472 199.486 6.80472Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M191.578 6.80472H188.419C188.103 6.80472 187.845 6.54544 187.845 6.22854C187.845 5.91164 188.103 5.65236 188.419 5.65236H191.578C191.894 5.65236 192.152 5.91164 192.152 6.22854C192.152 6.54544 191.894 6.80472 191.578 6.80472Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M34.1487 142.594H21.1119C20.796 142.594 20.5376 142.334 20.5376 142.018C20.5376 141.701 20.796 141.441 21.1119 141.441H34.1487C34.4646 141.441 34.723 141.701 34.723 142.018C34.723 142.334 34.4646 142.594 34.1487 142.594Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M42.3896 142.594H38.4268C38.111 142.594 37.8525 142.334 37.8525 142.018C37.8525 141.701 38.111 141.441 38.4268 141.441H42.3896C42.7054 141.441 42.9639 141.701 42.9639 142.018C42.9639 142.334 42.7112 142.594 42.3896 142.594Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M308.065 32.8655H295.028C294.712 32.8655 294.454 32.6062 294.454 32.2893C294.454 31.9724 294.712 31.7131 295.028 31.7131H308.065C308.381 31.7131 308.639 31.9724 308.639 32.2893C308.639 32.6062 308.381 32.8655 308.065 32.8655Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M290.749 32.8655H286.787C286.471 32.8655 286.212 32.6062 286.212 32.2893C286.212 31.9724 286.471 31.7131 286.787 31.7131H290.749C291.065 31.7131 291.324 31.9724 291.324 32.2893C291.324 32.6062 291.065 32.8655 290.749 32.8655Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M399.184 96.597H386.148C385.832 96.597 385.573 96.3378 385.573 96.0209C385.573 95.704 385.832 95.4447 386.148 95.4447H399.184C399.5 95.4447 399.759 95.704 399.759 96.0209C399.759 96.3378 399.5 96.597 399.184 96.597Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M407.426 96.597H403.463C403.147 96.597 402.889 96.3378 402.889 96.0209C402.889 95.704 403.147 95.4447 403.463 95.4447H407.426C407.742 95.4447 408 95.704 408 96.0209C408 96.3378 407.742 96.597 407.426 96.597Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M368.667 69.9025C368.432 69.9025 368.208 69.8046 368.041 69.6432L362.333 63.916C361.402 62.9826 360.891 61.7438 360.891 60.4243C360.891 59.1048 361.402 57.866 362.333 56.9326C363.263 55.9992 364.498 55.4864 365.813 55.4864C366.841 55.4864 367.84 55.8091 368.667 56.4025C369.494 55.8091 370.494 55.4864 371.522 55.4864C372.837 55.4864 374.071 55.9992 375.002 56.9326C375.932 57.866 376.443 59.1048 376.443 60.4243C376.443 61.7438 375.932 62.9826 375.002 63.916L369.287 69.649C369.127 69.8103 368.897 69.9025 368.667 69.9025ZM368.851 68.825C368.851 68.8308 368.851 68.825 368.851 68.825V68.825ZM365.807 56.633C364.802 56.633 363.855 57.0248 363.137 57.7393C362.424 58.4538 362.034 59.4045 362.034 60.4185C362.034 61.4269 362.424 62.3776 363.137 63.0978L368.661 68.6407L374.186 63.0978C374.898 62.3833 375.289 61.4326 375.289 60.4185C375.289 59.4045 374.898 58.4538 374.186 57.7393C373.474 57.0248 372.527 56.633 371.516 56.633C370.603 56.633 369.724 56.9614 369.041 57.5664L368.661 57.9006L368.282 57.5664C367.605 56.9672 366.72 56.633 365.807 56.633Z"
                                            fill="black"></path>
                                        <path
                                            d="M70.1515 184.476C69.6231 184.476 69.0948 184.379 68.5894 184.177C66.4128 183.313 65.3445 180.829 66.206 178.645C66.6252 177.585 67.4235 176.756 68.4688 176.306C69.5083 175.857 70.6626 175.834 71.7194 176.254C73.896 177.119 74.9642 179.596 74.1027 181.786C73.6835 182.846 72.8795 183.676 71.84 184.125C71.3001 184.355 70.7258 184.476 70.1515 184.476ZM70.1515 177.101C69.7323 177.101 69.3188 177.188 68.9225 177.361C68.1644 177.689 67.5786 178.294 67.2742 179.066C66.6482 180.662 67.4235 182.471 69.0144 183.099C69.7839 183.405 70.6282 183.393 71.3863 183.059C72.1443 182.725 72.7301 182.12 73.0345 181.348C73.6605 179.758 72.8795 177.943 71.2944 177.315C70.9211 177.176 70.5363 177.101 70.1515 177.101Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M76.986 180.161C76.8425 180.161 76.6931 180.132 76.5496 180.074C76.2567 179.959 76.0212 179.729 75.8948 179.441C75.7685 179.147 75.7628 178.824 75.8834 178.53C76.1246 177.92 76.8137 177.62 77.4283 177.856C78.037 178.098 78.3357 178.795 78.0944 179.406C77.9049 179.873 77.457 180.161 76.986 180.161ZM76.986 178.346C76.9056 178.346 76.8195 178.363 76.7391 178.398C76.5898 178.461 76.4692 178.582 76.4117 178.738C76.3486 178.893 76.3543 179.06 76.4175 179.21C76.4806 179.36 76.6012 179.481 76.7563 179.539C77.0722 179.66 77.4282 179.51 77.5546 179.193C77.6809 178.876 77.5259 178.519 77.21 178.392C77.1411 178.363 77.0607 178.346 76.986 178.346Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M72.0592 186.447C72.3097 186.447 72.5129 186.243 72.5129 185.992C72.5129 185.74 72.3097 185.537 72.0592 185.537C71.8086 185.537 71.6055 185.74 71.6055 185.992C71.6055 186.243 71.8086 186.447 72.0592 186.447Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M72.0588 186.729C71.967 186.729 71.8751 186.712 71.7889 186.677C71.6051 186.603 71.4616 186.464 71.3812 186.286C71.3008 186.101 71.3008 185.9 71.3697 185.721C71.519 185.341 71.9497 185.151 72.3288 185.306C72.7078 185.462 72.8916 185.888 72.7423 186.268C72.6676 186.453 72.5298 186.597 72.3517 186.677C72.2599 186.712 72.1565 186.729 72.0588 186.729ZM72.0588 185.825C71.9957 185.825 71.9325 185.865 71.9038 185.928C71.8866 185.969 71.8866 186.015 71.9038 186.055C71.921 186.096 71.9555 186.124 71.9957 186.142C72.0359 186.159 72.0818 186.159 72.122 186.142C72.1622 186.124 72.1909 186.09 72.2082 186.049C72.2426 185.963 72.2024 185.871 72.1163 185.836C72.099 185.831 72.0818 185.825 72.0588 185.825Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M78.4449 184.085C78.6955 184.085 78.8986 183.881 78.8986 183.629C78.8986 183.378 78.6955 183.174 78.4449 183.174C78.1943 183.174 77.9912 183.378 77.9912 183.629C77.9912 183.881 78.1943 184.085 78.4449 184.085Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M78.4506 184.367C78.3587 184.367 78.2669 184.35 78.1807 184.315C77.8017 184.165 77.6179 183.733 77.7672 183.353C77.8419 183.169 77.9797 183.024 78.1635 182.944C78.3473 182.869 78.5483 182.863 78.7263 182.938C79.1053 183.088 79.2891 183.52 79.1398 183.9C79.0651 184.085 78.9273 184.229 78.7435 184.309C78.6459 184.35 78.5483 184.367 78.4506 184.367ZM78.4449 183.462C78.4219 183.462 78.3989 183.468 78.3817 183.474C78.3415 183.491 78.3128 183.526 78.2956 183.566C78.2611 183.653 78.3013 183.745 78.3875 183.779C78.4277 183.797 78.4736 183.797 78.5138 183.779C78.554 183.762 78.5827 183.727 78.6 183.687C78.6344 183.601 78.5942 183.508 78.5081 183.474C78.4908 183.468 78.4679 183.462 78.4449 183.462Z"
                                            fill="#BE0017"></path>
                                        <path
                                            d="M210.283 92.3621C210.151 92.3621 210.03 92.2699 210.001 92.1316C208.841 86.4447 204.356 85.5862 204.31 85.5804C204.155 85.5516 204.052 85.4018 204.074 85.2463C204.103 85.0907 204.247 84.987 204.408 85.01C204.454 85.0158 209.318 85.9434 210.558 92.0164C210.593 92.172 210.489 92.3275 210.334 92.3563C210.323 92.3621 210.306 92.3621 210.283 92.3621Z"
                                            fill="white"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="408" height="241" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <h2 className="default-form-success__heading">Спасибо, <br/>заявка отправлена!</h2>
                            <p className="default-form-success__text">В&nbsp;ближайшее время мы&nbsp;рассмотрим заявку
                                и&nbsp;свяжемся с&nbsp;вами</p>
                            <div className="default-form-success__control">
                                <a className="js-website-aside-close" href="#" onClick={(e) => e.preventDefault()}>Закрыть
                                    окно</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div hidden={true}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <symbol viewBox="0 0 14 14" id="arrow-left" xmlnsXlink="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M7.59 1.59A.833.833 0 006.41.41L.578 6.245a.833.833 0 000 1.178l5.834 5.834a.833.833 0 001.178-1.179l-4.41-4.41h9.654a.833.833 0 000-1.667H3.18l4.41-4.411z"></path>
                    </symbol>
                    <symbol viewBox="0 0 14 14" id="arrow-right" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M6.41 12.41a.833.833 0 001.18 1.179l5.832-5.834a.833.833 0 000-1.178L7.59.744a.833.833 0 10-1.178 1.178l4.41 4.41H1.167a.833.833 0 000 1.667h9.654l-4.41 4.411z"></path>
                    </symbol>
                    <symbol viewBox="0 0 8 8" id="arrow-top-right" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M.667 0a.667.667 0 000 1.333h5.008L.195 6.862a.667.667 0 00.943.943l5.529-5.578v5.106a.667.667 0 101.333 0V.667A.667.667 0 007.333 0H.667z"></path>
                    </symbol>
                    <symbol viewBox="0 0 15 16" id="attachment" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M10.52 1.592c-.53 0-1.04.21-1.415.586L2.978 8.305a3.336 3.336 0 104.717 4.717l6.127-6.127a.667.667 0 11.943.943l-6.127 6.127a4.669 4.669 0 11-6.603-6.603l6.127-6.127a3.335 3.335 0 114.716 4.716l-6.133 6.127a2 2 0 01-2.83-2.83l5.66-5.653a.667.667 0 11.943.943l-5.66 5.653a.668.668 0 00.944.944l6.133-6.126a2.002 2.002 0 00-1.415-3.417z"></path>
                    </symbol>
                    <symbol viewBox="0 0 24 24" id="bullet-checked" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M22.707 3.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L12 12.586l9.293-9.293a1 1 0 011.414 0z"></path>
                        <path clipRule="evenodd"
                              d="M5 4a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-7a1 1 0 112 0v7a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h11a1 1 0 110 2H5z"></path>
                    </symbol>
                    <symbol viewBox="0 0 32 32" id="close" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M24.943 7.057c.52.52.52 1.365 0 1.886l-16 16a1.333 1.333 0 01-1.886-1.886l16-16c.521-.52 1.365-.52 1.886 0z"></path>
                        <path clipRule="evenodd"
                              d="M7.057 7.057c.521-.52 1.365-.52 1.886 0l16 16a1.333 1.333 0 11-1.886 1.886l-16-16a1.333 1.333 0 010-1.886z"></path>
                    </symbol>
                    <symbol viewBox="0 0 382.117 382.117" id="email" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg"
                              d="M336.764 45.945H45.354C20.346 45.945 0 65.484 0 89.5v203.117c0 24.016 20.346 43.555 45.354 43.555h291.41c25.008 0 45.353-19.539 45.353-43.555V89.5c0-24.016-20.345-43.555-45.353-43.555zm0 251.775H45.354c-3.676 0-6.9-2.384-6.9-5.103V116.359l131.797 111.27a15.014 15.014 0 009.676 3.538l22.259.001c3.536 0 6.974-1.257 9.677-3.539l131.803-111.274v176.264c-.002 2.717-3.227 5.101-6.902 5.101zM191.059 192.987L62.87 84.397h256.378l-128.189 108.59z"></path>
                    </symbol>
                    <symbol viewBox="0 0 9 17" id="fb" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.706 16.927V9.206h2.592l.388-3.009h-2.98V4.276c0-.871.242-1.465 1.491-1.465L8.79 2.81V.118A21.344 21.344 0 006.468 0c-2.297 0-3.87 1.403-3.87 3.977v2.22H0v3.009h2.599v7.721h3.107z"></path>
                    </symbol>
                    <symbol viewBox="0 0 17 17" id="inst" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.464 1.525c2.26 0 2.528.009 3.42.05.826.038 1.273.175 1.572.292.395.153.677.336.973.633.296.296.48.578.633.973.116.298.254.746.291 1.571.041.893.05 1.16.05 3.42s-.009 2.528-.05 3.42c-.037.826-.175 1.273-.291 1.572a2.625 2.625 0 01-.633.973c-.296.296-.578.48-.973.633-.299.116-.746.254-1.572.291-.892.041-1.16.05-3.42.05s-2.527-.009-3.42-.05c-.825-.037-1.273-.175-1.571-.291a2.626 2.626 0 01-.973-.633 2.613 2.613 0 01-.633-.973c-.117-.299-.254-.746-.292-1.572-.041-.892-.05-1.16-.05-3.42s.009-2.527.05-3.42c.038-.825.175-1.273.292-1.571.154-.395.336-.677.633-.973.296-.297.578-.48.973-.633.298-.117.746-.254 1.571-.292.893-.041 1.16-.05 3.42-.05zm0-1.525c-2.298 0-2.587.01-3.49.05-.9.041-1.515.185-2.055.393a4.152 4.152 0 00-1.5.977c-.47.47-.76.943-.976 1.5-.208.538-.352 1.153-.392 2.054C.01 5.877 0 6.164 0 8.464c0 2.298.01 2.587.05 3.49.041.901.185 1.516.393 2.055.217.556.506 1.029.977 1.5.47.47.943.76 1.5.976.538.209 1.153.352 2.054.393.903.04 1.19.05 3.49.05 2.3 0 2.587-.01 3.49-.05.901-.041 1.516-.184 2.055-.393a4.153 4.153 0 001.5-.977c.47-.47.76-.943.976-1.5.209-.537.352-1.153.393-2.054.04-.903.05-1.19.05-3.49 0-2.298-.01-2.587-.05-3.49-.041-.9-.184-1.515-.393-2.055a4.153 4.153 0 00-.977-1.5c-.47-.47-.943-.76-1.5-.976-.537-.208-1.153-.352-2.054-.392C11.051.01 10.762 0 8.464 0z"></path>
                        <path
                            d="M8.464 4.117a4.347 4.347 0 100 8.694 4.347 4.347 0 000-8.694zm0 7.167a2.821 2.821 0 110-5.642 2.821 2.821 0 010 5.642z"></path>
                        <path d="M12.982 4.96a1.015 1.015 0 100-2.03 1.015 1.015 0 000 2.03z"></path>
                    </symbol>
                    <symbol viewBox="0 0 18 18" id="paper-plane" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M17.03.97a.75.75 0 010 1.06l-8.25 8.25a.75.75 0 01-1.06-1.06L15.97.97a.75.75 0 011.06 0z"></path>
                        <path clipRule="evenodd"
                              d="M17.03.97a.75.75 0 01.178.778l-5.25 15a.75.75 0 01-1.393.057l-2.883-6.487-6.487-2.883a.75.75 0 01.057-1.393l15-5.25a.75.75 0 01.778.178zM3.533 6.833l5.022 2.232a.75.75 0 01.38.38l2.232 5.022 4.11-11.745L3.534 6.833z"></path>
                    </symbol>
                    <symbol viewBox="0 0 578.106 578.106" id="phone" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M577.83 456.128c1.225 9.385-1.635 17.545-8.568 24.48l-81.396 80.781c-3.672 4.08-8.465 7.551-14.381 10.404-5.916 2.857-11.729 4.693-17.439 5.508-.408 0-1.635.105-3.676.309-2.037.203-4.689.307-7.953.307-7.754 0-20.301-1.326-37.641-3.979s-38.555-9.182-63.645-19.584c-25.096-10.404-53.553-26.012-85.376-46.818-31.823-20.805-65.688-49.367-101.592-85.68-28.56-28.152-52.224-55.08-70.992-80.783-18.768-25.705-33.864-49.471-45.288-71.299-11.425-21.828-19.993-41.616-25.705-59.364S4.59 177.362 2.55 164.51-.306 141.56.102 134.216c.408-7.344.612-11.424.612-12.24.816-5.712 2.652-11.526 5.508-17.442s6.324-10.71 10.404-14.382L98.022 8.756c5.712-5.712 12.24-8.568 19.584-8.568 5.304 0 9.996 1.53 14.076 4.59s7.548 6.834 10.404 11.322l65.484 124.236c3.672 6.528 4.692 13.668 3.06 21.42-1.632 7.752-5.1 14.28-10.404 19.584l-29.988 29.988c-.816.816-1.53 2.142-2.142 3.978s-.918 3.366-.918 4.59c1.632 8.568 5.304 18.36 11.016 29.376 4.896 9.792 12.444 21.726 22.644 35.802s24.684 30.293 43.452 48.653c18.36 18.77 34.68 33.354 48.96 43.76 14.277 10.4 26.215 18.053 35.803 22.949 9.588 4.896 16.932 7.854 22.031 8.871l7.648 1.531c.816 0 2.145-.307 3.979-.918 1.836-.613 3.162-1.326 3.979-2.143l34.883-35.496c7.348-6.527 15.912-9.791 25.705-9.791 6.938 0 12.443 1.223 16.523 3.672h.611l118.115 69.768c8.571 5.308 13.67 12.038 15.303 20.198z"></path>
                    </symbol>
                    <symbol viewBox="0 0 17 15" id="refresh" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M15.747.749a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h3.75v-3.75a.75.75 0 01.75-.75z"></path>
                        <path clipRule="evenodd"
                              d="M8.343 1.56a6 6 0 104.814 7.939.75.75 0 011.415.5 7.5 7.5 0 11-1.775-7.809l3.464 3.263a.75.75 0 01-1.028 1.092l-3.473-3.27A6 6 0 008.342 1.56z"></path>
                    </symbol>
                    <symbol viewBox="0 0 31 31" id="telegram" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M.167 15.016c0-8.285 6.715-15 15-15 8.284 0 15 6.715 15 15 0 8.284-6.716 15-15 15-8.285 0-15-6.716-15-15zm15-13c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13z"></path>
                        <path d="M12.6 21.432c.35 0 .505-.16.7-.35l1.867-1.815-2.329-1.404"></path>
                        <path
                            d="M12.838 17.863l5.642 4.169c.644.355 1.108.171 1.269-.598l2.296-10.822c.235-.943-.359-1.37-.975-1.091l-13.485 5.2c-.92.37-.916.883-.168 1.111l3.46 1.08 8.012-5.054c.379-.23.726-.106.44.147"></path>
                    </symbol>
                    <symbol viewBox="0 0 21 17" id="tl" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.623 15.97c.466 0 .672-.213.932-.466l2.486-2.416-3.1-1.87"></path>
                        <path
                            d="M7.94 11.218l7.512 5.55c.857.473 1.475.229 1.689-.795l3.058-14.409C20.511.31 19.72-.26 18.9.112L.946 7.035c-1.225.492-1.218 1.176-.223 1.48L5.33 9.953l10.667-6.73c.503-.304.965-.14.586.196"></path>
                        <defs>
                            <linearGradient id="paint0_linear" x1="8.707" y1="8.572" x2="10.699" y2="15.014"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EFF7FC"></stop>
                                <stop offset="1" stopColor="#fff"></stop>
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="8.707" y1="8.572" x2="10.699" y2="15.014"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EFF7FC"></stop>
                                <stop offset="1" stopColor="#fff"></stop>
                            </linearGradient>
                        </defs>
                    </symbol>
                    <symbol viewBox="0 0 32 31" id="whatsup" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd"
                              d="M1.398 14.883C1.4 6.68 8.073.01 16.273.01a14.786 14.786 0 0110.522 4.362 14.79 14.79 0 014.353 10.523c-.004 8.2-6.68 14.87-14.88 14.874-2.354 0-4.67-.56-6.754-1.623L.86 30.416l2.318-8.466a14.853 14.853 0 01-1.78-7.067zM16.272 2.01c-7.095 0-12.871 5.776-12.874 12.874a12.85 12.85 0 001.718 6.436l.209.361-1.621 5.922 6.063-1.59.349.19a12.862 12.862 0 006.151 1.566c7.098-.003 12.878-5.78 12.88-12.875a12.791 12.791 0 00-3.767-9.109 12.786 12.786 0 00-9.108-3.775z"></path>
                        <path clipRule="evenodd"
                              d="M22.735 17.882c.241.116.405.195.474.312.087.144.087.838-.202 1.648-.289.81-1.674 1.55-2.34 1.649-.597.09-1.353.126-2.184-.138-.503-.16-1.149-.373-1.976-.73-3.25-1.403-5.446-4.553-5.862-5.149a3.99 3.99 0 00-.06-.086l-.003-.003c-.184-.245-1.413-1.885-1.413-3.583 0-1.597.785-2.434 1.146-2.82l.068-.072c.317-.347.693-.434.924-.434.231 0 .463.002.665.012a1.4 1.4 0 00.077.001c.202 0 .454-.002.703.594l.382.93c.299.726.628 1.528.686 1.645.087.173.145.376.03.607l-.05.099a1.97 1.97 0 01-.297.48c-.058.067-.118.14-.178.213-.12.145-.239.29-.342.394-.174.173-.355.36-.152.707.202.347.898 1.482 1.928 2.402 1.108.988 2.071 1.406 2.559 1.617.095.042.172.075.23.104.346.173.548.144.75-.087.203-.232.867-1.012 1.098-1.36.231-.346.462-.289.78-.173.318.116 2.022.954 2.369 1.128l.19.093z"></path>
                    </symbol>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <symbol id="handmade-success" viewBox="0 0 141 198">
                        <path
                            d="M47.1436 83.3794C46.4903 82.443 46.5433 81.2946 46.8611 80.0226C47.3379 78.1498 48.3973 75.9944 48.6621 73.7683C49.0506 70.5351 47.4615 68.9804 47.4968 66.4892C47.5321 64.3515 48.7504 61.5247 49.1035 60.7649C49.1565 60.6413 49.1918 60.5706 49.1918 60.5706C47.3555 59.7579 45.8724 58.8745 44.707 57.9558C44.2832 57.6201 43.8948 57.2844 43.5417 56.9311C18.0099 67.3903 0 92.5312 0 121.877C0 137.76 5.27938 152.407 14.1784 164.173C14.5492 163.166 14.9553 162.177 15.4144 161.187C17.2154 154.792 19.1576 148.696 21.2411 142.937C29.4692 120.199 39.7278 102.761 50.3395 92.1249C52.2818 90.1814 54.277 88.9094 56.2192 88.185C52.3347 87.6196 49.1035 86.2239 47.1436 83.3794ZM28.2685 72.9909C27.4916 72.9909 26.8736 72.3725 26.8736 71.5952C26.8736 70.8178 27.4916 70.1994 28.2685 70.1994C29.0454 70.1994 29.6634 70.8178 29.6634 71.5952C29.6634 72.3549 29.0454 72.9909 28.2685 72.9909Z"
                            fill="#DCDEF6"></path>
                        <path
                            d="M118.354 70.9591C116.712 74.9873 114.593 78.8565 114.417 79.1569L114.346 79.2982L114.275 79.1745C108.996 70.4998 107.001 65.0935 108.325 63.0617C103.363 59.8286 97.978 57.2138 92.2749 55.3057C92.5044 55.9064 92.8223 56.4364 93.299 56.8427C100.026 62.6377 91.7275 65.2702 95.8592 73.0086C101.456 83.5384 89.0967 86.1002 81.6455 86.7186C81.6808 86.7186 81.7338 86.7362 81.7691 86.7362C82.9698 86.8952 83.6937 87.0189 83.6937 87.0189L95.2589 91.1178C99.0375 91.2061 103.169 92.6372 107.124 96.6124C116.959 106.506 127.43 130.039 131.226 156.276C136.964 146.117 140.231 134.368 140.231 121.859C140.213 101.824 131.826 83.7504 118.354 70.9591ZM110.585 84.9341C110.197 84.9341 109.879 84.6161 109.879 84.2274C109.879 83.8388 110.197 83.5207 110.585 83.5207C110.973 83.5207 111.291 83.8388 111.291 84.2274C111.291 84.6161 110.973 84.9341 110.585 84.9341ZM120.561 95.4993C117.348 90.2344 120.561 91.9835 120.561 91.9835C123.527 90.1107 120.561 95.4993 120.561 95.4993Z"
                            fill="#DCDEF6"></path>
                        <path
                            d="M114.116 75.9944C108.96 67.5316 109.384 65.1642 110.867 64.7755C110.073 64.2101 109.278 63.6624 108.466 63.1324C107.548 64.5458 107.971 68.468 114.328 78.9272C114.734 78.1852 116.676 74.5456 118.195 70.8178C117.806 70.4644 117.418 70.0934 117.029 69.7401C115.882 72.7965 114.116 75.9944 114.116 75.9944Z"
                            fill="#DCDEF6"></path>
                        <path
                            d="M36.0552 183.201C36.2317 183.289 36.4083 183.395 36.5672 183.484C36.4083 183.378 36.2317 183.272 36.0905 183.166C36.0728 183.183 36.0728 183.201 36.0552 183.201Z"
                            fill="#E56865"></path>
                        <path
                            d="M86.4653 190.091C86.9244 189.985 87.3658 189.862 87.8249 189.756C87.7896 189.738 87.7719 189.72 87.7366 189.703C87.3129 189.844 86.9068 189.968 86.4653 190.091Z"
                            fill="#E56865"></path>
                        <path
                            d="M42.7827 56.0477C43.0123 56.348 43.2771 56.6307 43.5596 56.9134C43.5773 56.9134 43.5773 56.8957 43.5949 56.8957C43.2948 56.6131 43.0299 56.3304 42.7827 56.0477Z"
                            fill="#648EE5"></path>
                        <path
                            d="M43.5949 56.9134C43.5772 56.9134 43.5772 56.9311 43.5596 56.9311C43.9127 57.2844 44.2835 57.6201 44.7249 57.9558C44.3188 57.6025 43.9304 57.2491 43.5949 56.9134Z"
                            fill="#648EE5"></path>
                        <path d="M77.7075 39.0868L82.5455 40.4296C80.8857 39.6875 79.2613 39.2812 77.7075 39.0868Z"
                              fill="#648EE5"></path>
                        <path
                            d="M88.7255 68.4856C87.9133 67.0016 90.3852 64.7048 90.2087 62.938C89.9968 60.8533 86.695 60.0936 86.3065 57.8851C86.1476 57.0194 86.1299 55.235 86.077 53.5566C86.024 52.1785 85.971 50.8711 85.7768 50.2174C83.658 42.373 77.743 39.1398 77.69 39.1045C75.2004 38.8042 72.8697 39.0692 70.7862 39.4579C58.038 45.5355 59.2033 39.8112 60.2274 34.7406C60.3687 34.0339 60.6865 34.1753 60.9867 34.5109C60.8807 34.1576 60.6688 33.8042 60.2804 33.6629C58.6913 33.1505 55.107 36.154 52.8469 41.9136C53.0058 47.5319 59.839 49.44 57.2434 48.7333C48.5916 46.3659 50.6398 39.4755 51.8228 36.7901C51.8404 36.4544 51.7345 36.1717 51.1695 36.578C47.232 39.3872 37.6797 47.9736 42.1645 55.1996C42.5706 55.8357 43.1003 56.3834 43.7007 56.8781C47.956 60.3056 56.184 60.2172 56.184 60.2172C56.6254 60.3232 57.0669 60.4116 57.5259 60.4822C64.2708 61.4716 72.7108 57.9028 72.7108 57.9028C72.7108 57.9028 72.6931 66.8072 74.9532 66.9132C75.5712 66.6659 76.1362 66.3125 76.6129 65.8355C81.6451 60.7826 83.7992 65.2878 80.7093 73.4502C79.1732 77.5314 82.5986 79.9519 85.4766 79.7399C87.0481 79.5809 95.5763 80.8353 88.7255 68.4856ZM66.884 56.2774C62.0284 56.9841 52.2819 58.8038 47.6381 55.394C45.1838 53.5919 44.1597 50.3411 45.996 44.7051C46.9319 41.8606 48.521 41.4543 49.1566 41.896C49.3332 41.5956 49.4568 41.4366 49.4744 41.4189C49.4921 41.3836 49.5451 41.3836 49.5627 41.4013C49.598 41.4189 49.598 41.472 49.5804 41.4896C49.5804 41.5073 49.4568 41.6663 49.2626 41.9666C50.1984 42.903 50.0748 46.7192 52.07 49.1573C53.9593 51.4365 58.9561 51.5601 63.1938 52.0371C65.5421 52.3022 67.6609 52.6732 68.8616 53.6096C68.8616 53.6272 71.6514 55.5883 66.884 56.2774ZM75.4299 46.7899C70.8038 47.6556 66.9723 48.0973 63.953 48.0973C59.6448 48.0973 56.9786 47.2139 55.9898 45.4472C54.2771 42.373 58.3205 37.8324 58.4794 37.6558C58.4971 37.6204 58.55 37.6204 58.5677 37.6558C58.603 37.6734 58.603 37.7264 58.5677 37.7441C58.5324 37.7971 54.4183 42.4083 56.0957 45.3941C57.7378 48.3446 64.2355 48.7687 75.3946 46.6662C75.4299 46.6662 75.4652 46.6839 75.4652 46.7192C75.5005 46.7545 75.4829 46.7899 75.4299 46.7899ZM85.6179 53.4329C85.4766 54.5636 83.0047 57.8851 81.3273 58.0264C80.8329 58.0618 80.2855 57.3904 80.003 56.8957C79.8441 56.6307 79.8088 56.3657 79.8441 56.1184C79.4204 54.7403 81.9276 53.5919 83.7639 53.0442C84.7527 52.7439 85.5473 52.6378 85.5649 52.7615C85.5826 52.8675 85.5649 53.0265 85.5119 53.2032C85.5649 53.2032 85.6002 53.2209 85.6002 53.2385C85.6179 53.2915 85.6179 53.3622 85.6179 53.4329Z"
                            fill="#648EE5"></path>
                        <path
                            d="M53.253 61.9133C51.7522 61.7366 50.375 61.3303 49.1213 60.7649C48.7682 61.5423 47.5499 64.3514 47.5146 66.4892C47.4792 68.9803 49.0684 70.5351 48.6799 73.7682C48.415 75.9767 47.3556 78.1498 46.8789 80.0226C52.7056 87.9553 59.6448 84.1038 59.6448 84.1038C53.253 79.7045 53.253 61.9133 53.253 61.9133ZM55.9898 85.0048C55.7073 84.9695 49.4745 84.0684 48.4327 81.3476C48.0796 80.4466 48.3621 79.4395 49.2449 78.3618C49.2626 78.3265 49.3155 78.3265 49.3332 78.3618C49.3685 78.3795 49.3685 78.4325 49.3332 78.4501C48.468 79.4925 48.2032 80.4466 48.5386 81.2946C49.5627 83.9448 55.9192 84.8635 55.9898 84.8635C56.0251 84.8635 56.0428 84.8988 56.0428 84.9341C56.0604 84.9871 56.0251 85.0048 55.9898 85.0048Z"
                            fill="#648EE5"></path>
                        <path
                            d="M43.5948 56.9134C43.6301 56.8957 43.6654 56.8781 43.7007 56.8781C43.1004 56.401 42.5883 55.8357 42.1646 55.1997C42.3411 55.4823 42.553 55.7827 42.7649 56.0654C43.0297 56.3304 43.2946 56.6131 43.5948 56.9134Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M76.2773 66.1535C76.4009 66.0299 76.5068 65.9062 76.6304 65.8002C76.1537 66.2949 75.5887 66.6482 74.9707 66.8779C75.3238 66.9133 75.7653 66.7012 76.2773 66.1535Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M58.6379 76.4891C57.9493 74.8107 57.4019 72.9026 57.0311 70.9415C56.0953 65.9945 56.007 62.9734 56.06 61.454C56.0953 60.6059 56.166 60.2172 56.166 60.2172C56.166 60.2172 47.9379 60.3233 43.6826 56.8781C43.6473 56.8957 43.612 56.9134 43.5767 56.9134C43.9121 57.2491 44.3006 57.6025 44.7067 57.9558C45.872 58.8745 47.3552 59.7579 49.1915 60.5706C49.1915 60.5706 49.1562 60.6413 49.1032 60.7649C50.3569 61.3303 51.7341 61.7367 53.2349 61.9133C53.2349 61.9133 53.2349 79.7046 59.609 84.1038C59.609 84.1038 52.6699 87.9553 46.8432 80.0226C46.5253 81.2946 46.4724 82.443 47.1257 83.3794C49.0856 86.2062 52.3168 87.6196 56.2189 88.1673C57.8787 87.549 59.5031 87.3016 61.0922 87.3193C61.3041 87.2133 61.5336 87.1073 61.7455 87.0189C62.8049 86.5419 64.1821 86.2416 65.7713 86.0649C66.1774 86.0119 66.6011 85.9765 67.0425 85.9412C67.8371 85.1285 67.6076 83.9094 67.4663 81.966C63.5818 84.0331 60.5272 81.1003 58.6379 76.4891Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M95.859 73.0086C91.745 65.2525 100.026 62.6377 93.2988 56.8428C92.8221 56.4364 92.5042 55.9064 92.2747 55.3057C91.2506 52.6202 91.9922 48.3447 89.8028 45.9242C87.3308 43.2034 84.9118 41.4896 82.5635 40.4296L77.7255 39.0869C77.7255 39.0869 83.6758 42.32 85.8123 50.1997C85.9889 50.8534 86.0595 52.1608 86.1125 53.5389C86.1655 55.2173 86.2008 57.0018 86.342 57.8675C86.7305 60.0936 90.0323 60.8356 90.2442 62.9204C90.4207 64.6871 87.9488 67.0016 88.761 68.468C95.6118 80.8 87.0836 79.5632 85.5121 79.6869C82.6517 79.8989 79.2087 77.4785 80.7448 73.3972C83.8171 65.2348 81.6806 60.7296 76.6484 65.7825C80.1975 62.3904 82.6164 65.4998 81.3451 68.8744C80.4447 71.2771 78.3258 72.0722 78.3258 72.0722L77.7255 77.5138C77.7078 79.9696 78.2552 82.39 79.3146 84.6161L80.0562 85.4819L81.0097 86.6126C81.2392 86.6479 81.4687 86.6656 81.663 86.7009C89.0965 86.1002 101.456 83.5384 95.859 73.0086ZM90.2971 57.9381C90.2618 57.9205 90.2618 57.8675 90.2795 57.8498C90.2971 57.8145 90.3501 57.8145 90.3678 57.8321C90.3854 57.8498 92.8574 59.5812 93.1046 61.772C93.2105 62.726 92.875 63.6271 92.1334 64.4398C92.1158 64.4575 92.0981 64.4575 92.0805 64.4575C92.0628 64.4575 92.0452 64.4575 92.0275 64.4398C91.9922 64.4221 91.9922 64.3691 92.0275 64.3515C92.7514 63.5564 93.0693 62.6907 92.9633 61.7897C92.7338 59.6519 90.3148 57.9558 90.2971 57.9381ZM93.1046 76.7364C92.6102 78.5562 90.3325 79.9519 86.3067 80.8883H86.2891C86.2537 80.8883 86.2361 80.8706 86.2184 80.8353C86.2184 80.8 86.2361 80.7646 86.2714 80.7646C90.2442 79.8459 92.5042 78.4855 92.981 76.7011C93.493 74.793 91.6744 73.0616 91.6567 73.0439C91.6214 73.0262 91.6214 72.9732 91.6567 72.9556C91.6744 72.9202 91.7273 72.9202 91.745 72.9556C91.7627 72.9732 93.6343 74.7576 93.1046 76.7364Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M57.2606 48.7157C59.8561 49.4224 53.0053 47.5143 52.8641 41.896C52.7758 42.108 52.7051 42.32 52.6169 42.5497C51.3985 45.9065 51.7164 37.3908 51.7164 37.3908C51.7164 37.3908 51.8223 37.0728 51.84 36.7901C50.657 39.4579 48.6088 46.3659 57.2606 48.7157Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M61.1274 35.2707C61.1274 35.2707 61.1274 34.882 61.0038 34.4933C60.7213 34.1753 60.4035 34.0163 60.2445 34.723C59.2204 39.7935 58.0728 45.5178 70.8033 39.4402C65.1355 40.4649 61.3216 42.2847 61.1274 35.2707Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M11.5479 181.275C12.2365 184.809 14.6731 186.876 18.1515 187.265C16.0856 186.735 14.832 186.081 14.832 186.081C14.832 186.081 12.3954 184.632 11.5479 181.275Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M34.0424 132.531C34.5544 130.41 35.1548 128.361 35.861 126.365C39.9751 114.686 47.1261 106.029 50.6574 94.5276C52.2995 89.1743 56.4489 88.662 58.4971 88.768C58.55 88.7327 58.6207 88.6973 58.6736 88.662C58.6736 88.662 58.6736 88.662 58.6736 88.6443C58.6736 88.6267 58.6913 88.5913 58.7089 88.5913L58.8149 88.5736C58.8855 88.5383 58.9561 88.4853 59.0268 88.45C58.0733 88.397 57.1375 88.3263 56.237 88.185C54.2771 88.927 52.2995 90.1814 50.3573 92.1248C39.7279 102.761 29.4693 120.199 21.2412 142.937C26.397 138.078 31.5351 134.297 34.0424 132.531Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M61.093 87.3369C59.5216 87.3193 57.8795 87.5666 56.2197 88.185C57.1202 88.3086 58.0384 88.397 59.0095 88.45C59.6452 88.0613 60.3338 87.6903 61.093 87.3369Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M35.3491 131.347C35.3491 131.329 35.3667 131.329 35.3844 131.329C35.4021 131.329 35.4021 131.347 35.4021 131.364C35.3491 131.47 35.3138 131.594 35.2785 131.7C35.5257 131.541 35.6669 131.453 35.6669 131.453L34.943 137.654C35.8435 137.036 36.744 136.488 37.6092 136.011C37.6445 135.94 37.6621 135.905 37.6621 135.905C37.6798 135.87 37.7328 135.87 37.7504 135.887L37.7681 135.905C38.0682 135.746 38.3684 135.587 38.6686 135.446C39.0747 135.251 39.4631 135.11 39.8339 135.057C39.8516 135.057 39.8692 135.057 39.8869 135.057C39.9045 135.057 39.9222 135.057 39.9398 135.039C40.3813 134.969 40.7874 135.004 41.1935 135.092C41.1405 134.297 41.0875 133.502 41.0875 132.707C39.8692 130.993 38.6156 128.856 39.9575 128.714C40.3813 128.679 40.7874 128.732 41.2288 128.873C41.2818 128.237 41.3524 127.601 41.4407 126.965C41.8644 123.979 42.6943 120.923 44.0009 117.743L42.7296 117.478C42.5354 117.442 42.4118 117.248 42.4648 117.054C42.4824 116.983 42.5177 116.912 42.5707 116.859L42.1646 116.771C41.9704 116.736 41.8468 116.541 41.8998 116.347C41.9351 116.153 42.1293 116.029 42.3235 116.082L44.513 116.541C44.6719 116.188 44.8484 115.817 45.025 115.464C46.2786 112.884 47.2498 110.534 48.062 108.414C47.956 108.255 47.9914 108.061 48.1326 107.937C48.1679 107.902 48.2209 107.884 48.2562 107.867C48.5564 107.089 48.8212 106.33 49.0684 105.605C51.9994 97.1954 52.5468 92.5135 58.4971 88.7503C56.449 88.6443 52.2996 89.1567 50.6575 94.51C47.1262 106.029 39.9752 114.669 35.8611 126.347C35.1549 128.343 34.5545 130.393 34.0425 132.513C34.5369 132.177 34.9253 131.912 35.1902 131.718C35.2431 131.612 35.2961 131.488 35.3491 131.347ZM51.611 95.994C51.611 95.994 51.2579 96.7007 50.6575 97.9021L50.6399 97.9198C50.6399 97.9198 50.6399 97.9198 50.6222 97.9198C50.6046 97.9198 50.6046 97.9021 50.6046 97.8845C51.2049 96.6831 51.558 95.994 51.558 95.9764C51.558 95.9587 51.5757 95.9587 51.5933 95.9587C51.611 95.9587 51.611 95.9764 51.611 95.994ZM36.0024 129.721C36.2672 129.085 36.5321 128.432 36.8146 127.76C36.8146 127.743 36.8323 127.743 36.8499 127.743C36.8676 127.743 36.8676 127.76 36.8676 127.778C36.5851 128.449 36.3202 129.103 36.0554 129.739L36.0377 129.757C36.02 129.739 36.0024 129.721 36.0024 129.721ZM48.8918 101.365C49.2097 100.729 49.5275 100.093 49.8277 99.4569C49.8277 99.4392 49.8453 99.4392 49.863 99.4392C49.8806 99.4392 49.8806 99.4569 49.8806 99.4745C49.5628 100.093 49.2626 100.747 48.9448 101.383L48.9272 101.4C48.9272 101.4 48.9272 101.4 48.9095 101.4C48.8918 101.4 48.8918 101.383 48.8918 101.365ZM47.1791 104.881C47.497 104.209 47.8148 103.573 48.0973 102.973C48.0973 102.955 48.1149 102.955 48.1326 102.955C48.1503 102.955 48.1503 102.973 48.1503 102.99C47.8501 103.591 47.5499 104.227 47.2321 104.898L47.2144 104.916C47.2144 104.916 47.2144 104.916 47.1968 104.916C47.1791 104.898 47.1791 104.881 47.1791 104.881ZM45.5017 108.379C45.8196 107.725 46.1197 107.089 46.4199 106.453C46.4199 106.436 46.4376 106.436 46.4552 106.436C46.4729 106.436 46.4729 106.453 46.4729 106.471C46.1727 107.089 45.8725 107.725 45.5547 108.379L45.5371 108.397C45.5371 108.397 45.5371 108.397 45.5194 108.397C45.5017 108.414 45.5017 108.397 45.5017 108.379ZM43.8597 111.913C44.1598 111.276 44.46 110.64 44.7602 109.987C44.7602 109.969 44.7778 109.969 44.7955 109.969C44.8131 109.969 44.8131 109.987 44.8131 110.004C44.513 110.64 44.2128 111.294 43.9126 111.93L43.895 111.948C43.895 111.948 43.895 111.948 43.8773 111.948C43.8597 111.93 43.842 111.913 43.8597 111.913ZM43.1357 113.503C43.1534 113.503 43.1534 113.52 43.1534 113.538C42.8532 114.192 42.5531 114.845 42.2705 115.464L42.2529 115.481C42.2529 115.481 42.2529 115.481 42.2352 115.481C42.2176 115.481 42.2176 115.464 42.2176 115.446C42.5001 114.828 42.8003 114.174 43.1004 113.52C43.1181 113.503 43.1181 113.503 43.1357 113.503ZM40.6108 118.98C40.8933 118.344 41.1935 117.69 41.476 117.036C41.476 117.018 41.4936 117.018 41.5113 117.018C41.529 117.018 41.529 117.036 41.529 117.054C41.2288 117.707 40.9463 118.361 40.6638 118.997L40.6461 119.015C40.6461 119.015 40.6461 119.015 40.6285 119.015C40.6108 119.015 40.6108 118.997 40.6108 118.98ZM39.0394 122.548C39.3219 121.895 39.6044 121.259 39.8869 120.605C39.8869 120.587 39.9045 120.587 39.9222 120.587C39.9399 120.587 39.9398 120.605 39.9398 120.623C39.6573 121.259 39.3748 121.912 39.0923 122.566L39.0747 122.584C39.0747 122.584 39.0747 122.584 39.057 122.584C39.0394 122.566 39.0394 122.548 39.0394 122.548ZM38.3331 124.174C38.3331 124.156 38.3507 124.156 38.3684 124.156C38.3861 124.156 38.3861 124.174 38.3861 124.191C38.1035 124.845 37.821 125.499 37.5562 126.135L37.5385 126.153C37.5209 126.153 37.5209 126.135 37.5209 126.117C37.7681 125.481 38.0506 124.827 38.3331 124.174Z"
                            fill="#D68080"></path>
                        <path
                            d="M32.7182 139.244C33.0713 136.947 33.5128 134.704 34.0425 132.531C31.5352 134.297 26.3971 138.061 21.2413 142.919C19.1578 148.679 17.1979 154.756 15.4146 161.17C19.3344 152.53 26.2029 144.332 32.7182 139.244Z"
                            fill="#D68080"></path>
                        <path
                            d="M35.6493 131.453C35.6493 131.453 35.508 131.541 35.2608 131.7C35.049 132.248 34.8194 132.813 34.6075 133.343L34.5899 133.361C34.5722 133.361 34.5722 133.343 34.5722 133.326C34.7665 132.813 34.9783 132.283 35.1902 131.735C34.9254 131.912 34.5369 132.177 34.0425 132.531C33.5128 134.704 33.0714 136.947 32.7183 139.244C33.4598 138.661 34.1838 138.131 34.9077 137.636L35.6493 131.453ZM33.248 136.983C33.248 137 33.2303 137 33.2303 137C33.2127 137 33.2127 136.983 33.2127 136.965C33.4422 136.329 33.6894 135.658 33.9542 134.969C33.9542 134.951 33.9719 134.951 33.9896 134.951C34.0072 134.951 34.0072 134.969 34.0072 134.986C33.7247 135.675 33.4775 136.347 33.248 136.983Z"
                            fill="#D68080"></path>
                        <path
                            d="M79.1733 191.434C79.1733 191.434 79.191 191.434 79.1733 191.434C79.8266 191.364 80.4446 191.275 81.0273 191.204C81.0096 191.187 81.0096 191.187 80.992 191.169C80.3917 191.275 79.7913 191.364 79.1733 191.434Z"
                            fill="#E56865"></path>
                        <path
                            d="M66.1414 88.238C66.0888 88.238 66.0361 88.238 66.001 88.2556C66.0361 88.2731 66.0888 88.2907 66.1239 88.3083C66.1239 88.2731 66.1414 88.2556 66.1414 88.238Z"
                            fill="#E56865"></path>
                        <path
                            d="M80.939 86.7716C81.1685 86.7539 81.398 86.7363 81.6452 86.7186C81.4334 86.6833 81.2215 86.6656 80.9919 86.6302L81.0272 86.6833C80.9919 86.7009 80.9566 86.7363 80.939 86.7716Z"
                            fill="#E56865"></path>
                        <path
                            d="M63.3169 87.549C63.2463 87.602 63.1757 87.655 63.0874 87.7256L63.6524 87.6196C63.5465 87.5843 63.4229 87.5666 63.3169 87.549Z"
                            fill="#E56865"></path>
                        <path
                            d="M79.9855 88.9094L81.7688 86.7363C81.7335 86.7363 81.6805 86.7186 81.6452 86.7186C81.398 86.7363 81.1685 86.7539 80.939 86.7716C80.9036 86.8246 80.8507 86.8599 80.8154 86.9129C78.3257 89.6337 76.1363 91.7185 74.247 93.2379C69.7445 96.8244 66.9195 97.3368 65.8424 96.2061C65.1361 95.464 64.9772 94.2096 65.0832 92.8316C65.2067 91.2945 65.6835 89.6161 66.1249 88.291C66.0896 88.2733 66.0366 88.2557 66.0013 88.238C66.0543 88.238 66.1072 88.238 66.1426 88.2203C66.584 86.9306 66.9901 86.0119 66.9901 86.0119C67.0077 85.9942 67.0254 85.9766 67.0431 85.9412C66.6016 85.9766 66.1779 86.0119 65.7718 86.0649C65.2244 86.2769 64.4122 86.7009 63.3175 87.5313C63.4411 87.549 63.547 87.5666 63.6529 87.602L63.7589 87.5843C63.7765 87.5843 63.8119 87.602 63.8119 87.6196V87.6373C63.8119 87.655 63.7942 87.6726 63.7765 87.6726L62.9467 87.8316C62.7171 88.026 62.4699 88.238 62.2051 88.45C61.4282 89.1214 60.563 89.9871 59.5742 91.0648C56.9081 93.98 53.4297 98.5205 49.0861 105.623C48.8389 106.347 48.5564 107.107 48.2739 107.884C48.4151 107.849 48.5564 107.902 48.6447 108.008L50.9577 110.994C51.046 111.1 51.046 111.241 51.0107 111.347L51.3815 111.824C51.5051 111.983 51.4698 112.195 51.3108 112.319C51.2402 112.372 51.1696 112.39 51.099 112.39C50.993 112.39 50.8871 112.337 50.8165 112.248L48.5034 109.262C48.4151 109.156 48.4151 109.015 48.4504 108.909L48.0796 108.432C48.0796 108.432 48.0797 108.414 48.062 108.414C47.2498 110.534 46.261 112.884 45.025 115.464C44.8485 115.835 44.6895 116.188 44.513 116.541L47.2145 117.107C47.4087 117.142 47.5323 117.336 47.4793 117.531C47.4617 117.601 47.4263 117.672 47.3734 117.725L47.7795 117.813C47.9737 117.849 48.0973 118.043 48.0443 118.237C48.009 118.397 47.8678 118.52 47.6912 118.52C47.6735 118.52 47.6382 118.52 47.6206 118.52L43.9833 117.76C42.659 120.941 41.8468 123.997 41.423 126.983C60.4394 136.806 49.1037 140.958 51.1872 142.689C53.4297 144.562 53.2708 150.216 52.0348 156.965C51.8406 158.007 51.6287 159.067 51.3991 160.145C49.2097 170.233 45.2369 181.717 43.4712 186.611C42.659 186.346 41.8468 186.063 41.0522 185.728C49.8983 189.773 59.7508 192.017 70.1153 192.017C73.1876 192.017 76.2069 191.823 79.1733 191.434C79.7913 191.363 80.3916 191.275 81.0096 191.169C66.4427 178.555 61.9402 168.378 61.5165 160.127C61.3046 155.869 62.1698 152.142 63.2998 148.855C63.5117 148.237 63.7059 147.636 63.8825 147.018C63.7059 146.806 63.5293 146.594 63.3528 146.4C62.8231 145.764 62.311 145.145 61.8343 144.544C61.4282 144.032 61.0397 143.52 60.6866 143.025C60.4571 142.725 60.2628 142.424 60.0686 142.142C58.6031 140.004 57.8792 138.343 58.4972 137.636C62.2581 133.414 64.8536 129.174 67.5551 129.174C67.6434 129.174 67.714 129.174 67.8023 129.191C70.0447 129.403 65.0302 135.287 65.0302 135.287L67.3609 136.629C72.6579 130.923 80.268 134.615 80.268 134.615C77.231 127.619 75.8008 120.322 75.6419 113.98C75.5007 108.838 76.2069 104.315 77.5312 101.047C77.902 100.146 78.3257 99.3509 78.7848 98.6442C81.5746 94.298 85.565 93.3439 86.236 93.2202L84.435 92.2662C84.3997 92.2485 84.382 92.2132 84.3997 92.1779C84.4173 92.1425 84.4527 92.1249 84.488 92.1425L86.3596 93.1496C86.3773 93.1496 86.3772 93.1672 86.3949 93.1849C86.6068 93.0789 86.8187 92.9906 87.0305 92.8846L79.9855 88.9094ZM57.9498 106.206C57.9675 106.012 58.1264 105.853 58.3206 105.87C58.5148 105.888 58.6737 106.047 58.6561 106.241L58.6384 106.595C58.6737 106.577 58.6914 106.559 58.7267 106.559C58.762 106.542 58.7973 106.542 58.8503 106.542C59.0445 106.559 59.2034 106.718 59.1858 106.913L59.0622 109.563C59.0445 109.757 58.9033 109.898 58.709 109.898H58.6914C58.6384 109.898 58.5854 109.881 58.5501 109.863C58.4265 109.81 58.3383 109.669 58.3559 109.527L58.3736 109.174C58.3206 109.209 58.25 109.227 58.1793 109.227H58.1617C57.9675 109.209 57.8085 109.05 57.8262 108.856L57.9498 106.206ZM58.4619 129.191C58.4619 129.191 58.0911 129.085 57.526 128.767C56.4843 128.184 54.7716 126.824 53.3767 123.944C52.5292 122.955 51.664 121.577 50.9224 119.669C48.9801 114.563 53.8181 110.004 56.6432 116.241C56.6432 116.241 57.2612 115.11 58.3029 114.315C58.5148 114.156 58.7444 113.997 59.0092 113.891C60.6866 113.096 63.4234 113.785 63.2998 116.559C65.7188 117.354 67.0254 121.153 58.4619 129.191ZM65.6658 111.082C65.5599 111.082 65.4539 111.029 65.3833 110.941C65.3127 110.852 65.295 110.729 65.3303 110.623L65.3127 110.64C65.2421 110.693 65.1714 110.711 65.1008 110.711C64.9949 110.711 64.8889 110.658 64.8183 110.57C64.6947 110.411 64.73 110.199 64.8889 110.075L68.9147 107.089C69.0736 106.966 69.2855 107.001 69.4091 107.16C69.4797 107.248 69.4973 107.372 69.462 107.478L69.4797 107.46C69.6386 107.337 69.8505 107.372 69.9741 107.531C70.0977 107.69 70.0624 107.902 69.9035 108.026L65.8777 111.011C65.8247 111.064 65.7541 111.082 65.6658 111.082ZM67.6434 117.884L67.5728 117.213L66.6546 117.301C66.6369 117.301 66.6369 117.301 66.6193 117.301C66.4427 117.301 66.2838 117.16 66.2662 116.983C66.2485 116.789 66.3898 116.612 66.584 116.594L71.5632 116.117C71.7574 116.1 71.934 116.241 71.9516 116.435C71.9693 116.577 71.8987 116.7 71.7927 116.771L72.552 116.7L72.6226 117.407L67.6434 117.884ZM82.9518 91.3828C82.9342 91.4005 82.9165 91.4182 82.8989 91.4182C82.8812 91.4182 82.8812 91.4182 82.8635 91.4182L80.9919 90.4111C80.9566 90.3934 80.939 90.3581 80.9566 90.3228C80.9743 90.2874 81.0096 90.2698 81.0449 90.2874L82.9165 91.2945C82.9695 91.3122 82.9695 91.3475 82.9518 91.3828Z"
                            fill="#E56865"></path>
                        <path
                            d="M81.0269 191.205C83.0928 190.922 84.8761 190.551 86.4652 190.091C84.6642 190.515 82.8456 190.887 81.0093 191.169C81.0093 191.187 81.0269 191.187 81.0269 191.205Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M41.0522 185.728C39.5337 185.039 38.0329 184.279 36.5674 183.484C37.7504 184.226 39.2336 184.968 41.0522 185.728Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M59.0088 88.4323C58.9381 88.4677 58.8675 88.5207 58.7969 88.556L59.3442 88.45C59.2383 88.45 59.1324 88.45 59.0088 88.4323Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M62.9284 87.8316L61.6924 88.079C61.6747 88.079 61.6571 88.0613 61.6571 88.0436C61.6571 88.026 61.6747 87.9906 61.6924 87.9906L63.1049 87.708C63.1756 87.655 63.2639 87.5843 63.3345 87.5313C64.4292 86.7009 65.2414 86.2769 65.7888 86.0649C64.2173 86.2416 62.8224 86.5419 61.763 87.0189C61.5335 87.1249 61.3216 87.2309 61.1097 87.3193C60.3505 87.6726 59.6619 88.0436 59.0262 88.4147C59.1322 88.4147 59.2558 88.4323 59.3617 88.4323L59.962 88.3087C59.9797 88.3087 60.015 88.3263 60.015 88.344C60.015 88.3617 59.9973 88.397 59.9797 88.397L59.7678 88.4323L58.7261 88.6443C58.7084 88.6443 58.6907 88.6267 58.6907 88.6267C58.6378 88.662 58.5671 88.6973 58.5142 88.7327C52.5638 92.4959 52.0165 97.1778 49.0854 105.588C53.429 98.5028 56.9074 93.9446 59.5736 91.0295C60.5624 89.9517 61.4452 89.1037 62.2044 88.4147C62.4516 88.238 62.6988 88.026 62.9284 87.8316Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M42.6938 134.81C42.6938 134.81 41.8816 133.856 41.0518 132.707C41.0694 133.502 41.1047 134.297 41.1577 135.092C41.5285 135.181 41.864 135.322 42.2171 135.499L42.6938 134.81Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M51.1863 142.689C49.1028 140.958 60.4385 136.806 41.4221 126.983C41.3338 127.619 41.2632 128.255 41.2102 128.891C43.6645 129.704 46.3484 133.255 49.2441 137.177C49.7032 137.795 49.1735 140.039 48.3259 142.583C49.3677 144.509 50.3035 146.753 50.6743 148.997C50.8332 149.968 50.8862 150.94 50.7979 151.877C50.7626 152.177 50.7273 152.477 50.6743 152.76C50.1269 155.41 49.5442 157.866 48.8909 160.145C48.273 162.371 47.602 164.438 46.8957 166.329C43.7881 174.685 39.9919 179.933 36.1074 183.183C36.2663 183.289 36.4252 183.395 36.5842 183.501C38.0497 184.296 39.5505 185.056 41.069 185.745C41.8635 186.063 42.6581 186.364 43.488 186.629C45.2536 181.735 49.2088 170.251 51.4159 160.163C51.6454 159.085 51.8573 158.025 52.0515 156.982C53.2522 150.216 53.4111 144.544 51.1863 142.689Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M77.5303 109.333C77.4243 105.941 77.8834 102.814 79.0664 99.9339C79.5255 98.8385 80.0728 97.7961 80.7438 96.7714C80.7438 96.7714 82.8979 94.828 86.2527 93.2202L86.2174 93.2026C85.5288 93.3439 81.5384 94.298 78.7662 98.6265C78.3072 99.3332 77.8834 100.128 77.5126 101.029C76.1707 104.28 75.4821 108.821 75.6233 113.962C75.7822 120.322 77.2124 127.601 80.2494 134.598C80.2494 134.598 72.657 130.905 67.3423 136.612L69.2316 137.689L70.7147 138.538C70.8913 138.272 71.368 138.06 71.8095 137.901C72.0567 137.689 72.3038 137.601 72.5687 137.654C72.5864 137.601 72.6393 137.583 72.6746 137.601C72.7276 137.619 72.7453 137.672 72.7276 137.707C78.0953 139.615 83.5865 141.947 88.9189 144.527C87.6653 141.7 86.4469 138.944 85.3169 136.294C80.9557 126.064 77.7775 117.036 77.5303 109.333Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M65.1351 161.152C64.7996 160.887 64.5171 160.534 64.3229 160.145C63.0869 157.777 64.0934 153.378 65.7001 149.085C65.0821 148.396 64.4818 147.707 63.8991 147.036C63.7226 147.654 63.5283 148.272 63.3165 148.873C62.1864 152.159 61.3036 155.905 61.5331 160.145C61.9569 168.396 66.4594 178.572 81.0262 191.187C82.8802 190.904 84.6988 190.533 86.4822 190.109C86.9236 189.985 87.3297 189.862 87.7535 189.72C70.3439 179.279 65.5059 162.548 65.1351 161.152Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M83.6751 87.0012C83.6751 87.0012 82.9512 86.8776 81.7505 86.7186L79.9849 88.9093L87.0299 92.8669C87.6303 92.6018 88.2836 92.3545 88.9545 92.1248C90.8615 91.4888 92.9979 91.0648 95.258 91.1178L83.6751 87.0012Z"
                            fill="#CE5F5F"></path>
                        <path
                            d="M76.7891 68.521C75.2353 68.7153 74.1053 68.1853 73.2931 67.2843C71.0154 64.7401 71.2272 59.2632 71.2272 59.2632C65.8772 61.6837 61.3748 61.984 58.479 61.772C58.1259 61.7543 57.7904 61.719 57.4903 61.6837C57.4196 66.1182 57.5962 71.8248 58.6379 76.4891C60.5272 81.1003 63.5818 84.0331 67.4663 82.0013C67.6076 83.9448 67.8371 85.1638 67.0426 85.9765C67.0249 85.9942 67.0073 86.0119 66.9896 86.0472C66.9896 86.0472 66.5835 86.9659 66.1421 88.2557C66.1421 88.2733 66.1244 88.291 66.1244 88.3087C65.683 89.6161 65.2239 91.3121 65.0827 92.8492C66.6894 96.5594 70.1502 95.0753 73.3284 92.4959C75.5532 90.6938 77.6543 88.344 78.8726 86.9129C79.0139 86.7539 79.1375 86.6126 79.2434 86.4712C79.2787 86.4359 79.314 86.3829 79.3494 86.3476C73.8934 82.8141 78.4136 68.309 76.7891 68.521ZM61.6396 73.5209C58.4614 72.7789 61.6926 68.468 61.6926 68.468C61.2158 69.21 61.004 69.9167 60.8097 70.4644C59.9269 72.8495 61.2688 73.4149 61.6396 73.5209C61.6749 73.5209 61.6926 73.5386 61.7279 73.5386C61.7102 73.5563 61.6749 73.5386 61.6396 73.5209Z"
                            fill="#EFE1C5"></path>
                        <path
                            d="M57.4907 61.666C57.7909 61.7013 58.1264 61.7366 58.4795 61.7543C58.1087 61.5246 57.7909 61.2949 57.4907 61.1183C57.5084 61.2949 57.4907 61.4893 57.4907 61.666Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M57.5255 60.4646C57.0664 60.3939 56.625 60.3056 56.1836 60.1996C56.1836 60.1996 56.678 60.5706 57.5079 61.1183C57.5079 60.8886 57.5079 60.6766 57.5255 60.4646Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M61.6401 73.5209C61.6928 73.5385 61.7279 73.5385 61.7279 73.5385C61.6928 73.5385 61.6577 73.5385 61.6401 73.5209Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M60.7927 70.4644C60.9869 69.9167 61.1988 69.21 61.6755 68.468C61.6755 68.468 58.462 72.7612 61.6225 73.5209C61.2694 73.4149 59.9275 72.8495 60.7927 70.4644Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M79.6321 86.4712C79.5262 86.4182 79.4379 86.3652 79.3496 86.2946C79.3143 86.3299 79.279 86.3829 79.2437 86.4182C79.3849 86.4359 79.5085 86.4536 79.6321 86.4712Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M78.8726 86.8776C79.3316 86.8599 79.8613 86.8422 80.4264 86.8069C80.1438 86.7186 79.879 86.6126 79.6318 86.4712C79.5082 86.4535 79.3669 86.4359 79.2433 86.4359C79.1374 86.5596 79.0138 86.7186 78.8726 86.8776Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M80.9388 86.7716C80.7622 86.7892 80.6033 86.7892 80.4268 86.8069C80.5504 86.8422 80.674 86.8776 80.8152 86.9129C80.8505 86.8599 80.9035 86.8069 80.9388 86.7716Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M81.3263 68.892C82.58 65.5175 80.1786 62.408 76.6296 65.8002C76.5237 65.9062 76.4001 66.0299 76.2765 66.1535C75.7644 66.6836 75.3407 66.9132 74.9522 66.8956C72.6922 66.7719 72.7098 57.8851 72.7098 57.8851C72.7098 57.8851 64.2699 61.454 57.525 60.4646C57.525 60.6766 57.5073 60.9063 57.5073 61.1183C57.7898 61.3126 58.1253 61.5246 58.4961 61.7543C61.4095 61.9663 65.8943 61.666 71.2443 59.2455C71.2443 59.2455 71.0148 64.7225 73.3102 67.2666C74.1224 68.1676 75.2347 68.6977 76.8062 68.5033C78.4306 68.2913 73.8928 82.814 79.3664 86.2945C79.4547 86.3476 79.5607 86.4182 79.6489 86.4712C79.8961 86.5949 80.161 86.7186 80.4435 86.8069C80.6024 86.7892 80.779 86.7892 80.9555 86.7716C80.9909 86.7362 81.0085 86.7186 81.0438 86.6832L81.0085 86.6302L80.055 85.4995L79.3135 84.6338C78.2541 82.4254 77.7067 79.9872 77.7244 77.5314L78.3247 72.0898C78.2894 72.0898 80.4258 71.3125 81.3263 68.892Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M56.0774 61.4363C56.0245 62.9557 56.1127 65.9769 57.0486 70.9238C57.4193 72.8849 57.9491 74.793 58.6553 76.4714C57.6312 71.7895 57.437 66.1005 57.5076 61.666C57.5076 61.4893 57.5076 61.295 57.5253 61.1183C56.6954 60.5529 56.201 60.1996 56.201 60.1996C56.201 60.1996 56.1127 60.5883 56.0774 61.4363Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M73.3459 92.4606C70.1676 95.04 66.7069 96.5241 65.1001 92.8139C64.9942 94.192 65.1531 95.4464 65.8594 96.1884C66.9188 97.3191 69.7439 96.8244 74.2464 93.2026C76.1356 91.6832 78.3251 89.6161 80.8147 86.8776C80.6911 86.8423 80.5498 86.8069 80.4262 86.7716C79.8612 86.8069 79.3492 86.8246 78.8724 86.8423C77.6718 88.3264 75.5706 90.6585 73.3459 92.4606Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M128.012 197.317C127.994 197.335 127.977 197.335 127.959 197.353C127.977 197.335 127.994 197.317 128.012 197.317Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M128.012 197.3C128.418 197.052 128.806 196.752 129.177 196.381C128.806 196.734 128.418 197.052 128.012 197.3Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M124.375 197.918C125.381 198.077 126.334 198.007 127.182 197.689C127.005 197.742 126.829 197.777 126.67 197.795C125.893 197.848 125.134 197.883 124.375 197.918Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M112.015 126.223C109.79 120.729 107.494 115.729 105.111 111.329C101.95 105.482 97.5007 100.358 93.8987 96.7184C91.8505 94.6513 90.0672 93.0612 88.9372 92.1072C88.2662 92.3369 87.6306 92.5842 87.0126 92.8492C86.8007 92.9376 86.5888 93.0436 86.3769 93.1496C86.3769 93.1672 86.3946 93.1849 86.3769 93.2026C86.3769 93.2202 86.3593 93.2202 86.3593 93.2202C86.3416 93.2202 86.3416 93.2202 86.324 93.2202C86.3063 93.2202 86.3063 93.2202 86.2887 93.2202L86.2533 93.2026C82.8985 94.8103 80.7444 96.7537 80.7444 96.7537C80.0735 97.7608 79.5261 98.8209 79.067 99.9162C77.884 102.778 77.4249 105.923 77.5309 109.315C77.7781 117.018 80.9563 126.047 85.3352 136.311C94.4637 140.499 101.615 144.65 107.212 148.59C107.618 148.873 108.024 149.173 108.413 149.456C113.674 153.272 117.471 156.894 120.243 160.127C120.825 160.816 121.373 161.488 121.885 162.159C122.821 163.396 123.597 164.562 124.251 165.657C120.737 150.94 116.588 137.53 112.015 126.223ZM107.018 119.81C107.035 119.792 107.071 119.81 107.071 119.828C107.371 120.446 107.689 121.1 107.989 121.736C108.007 121.753 107.989 121.789 107.971 121.789H107.954C107.936 121.789 107.918 121.771 107.918 121.771C107.618 121.135 107.318 120.481 107 119.863C106.982 119.845 107 119.828 107.018 119.81ZM105.27 116.347C105.287 116.329 105.323 116.347 105.323 116.365C105.641 116.983 105.976 117.619 106.294 118.255C106.311 118.273 106.294 118.308 106.276 118.308H106.258C106.241 118.308 106.223 118.308 106.223 118.29C105.905 117.654 105.57 117.018 105.252 116.4C105.234 116.382 105.252 116.347 105.27 116.347ZM103.398 112.937C103.416 112.92 103.451 112.937 103.451 112.955C103.787 113.556 104.14 114.192 104.475 114.81C104.493 114.828 104.475 114.863 104.457 114.863H104.44C104.422 114.863 104.405 114.863 104.405 114.845C104.069 114.227 103.716 113.591 103.38 112.99C103.38 112.973 103.38 112.955 103.398 112.937ZM101.421 109.598C101.438 109.58 101.474 109.598 101.474 109.616C101.844 110.216 102.215 110.817 102.568 111.435C102.586 111.453 102.568 111.488 102.551 111.488H102.533C102.515 111.488 102.498 111.488 102.498 111.471C102.144 110.852 101.774 110.252 101.403 109.651C101.385 109.633 101.403 109.598 101.421 109.598ZM99.3194 106.33C99.337 106.312 99.3723 106.33 99.3723 106.347C99.7608 106.93 100.149 107.513 100.538 108.114C100.555 108.132 100.538 108.167 100.52 108.167H100.502C100.485 108.167 100.467 108.167 100.467 108.149C100.079 107.549 99.6902 106.948 99.3017 106.383C99.2841 106.365 99.3017 106.347 99.3194 106.33ZM97.077 103.149C97.0946 103.132 97.1299 103.132 97.1299 103.167C97.536 103.715 97.9598 104.298 98.3659 104.881C98.3836 104.898 98.3836 104.934 98.3482 104.934H98.3306C98.3129 104.934 98.2953 104.934 98.2953 104.916C97.8892 104.333 97.4654 103.75 97.0593 103.202C97.0593 103.202 97.0593 103.167 97.077 103.149ZM94.6756 100.093C94.6933 100.075 94.7286 100.075 94.7463 100.093C95.1877 100.623 95.6291 101.188 96.0705 101.754C96.0882 101.771 96.0882 101.807 96.0705 101.824C96.0705 101.824 96.0529 101.842 96.0352 101.842C96.0176 101.842 96.0176 101.842 95.9999 101.824C95.5585 101.259 95.1171 100.694 94.6756 100.164C94.658 100.128 94.658 100.111 94.6756 100.093ZM92.1154 97.1778C92.1331 97.1601 92.1684 97.1601 92.186 97.1778C92.6451 97.6725 93.1395 98.2025 93.6162 98.7502C93.6339 98.7679 93.6339 98.8032 93.6162 98.8208C93.6162 98.8208 93.5986 98.8385 93.5809 98.8385C93.5633 98.8385 93.5633 98.8385 93.5456 98.8208C93.0689 98.2732 92.5921 97.7431 92.1154 97.2484C92.0977 97.2131 92.0977 97.1954 92.1154 97.1778ZM89.2903 94.4923C89.308 94.4746 89.3256 94.4746 89.3609 94.4923C89.3609 94.4923 89.9436 94.9517 90.9324 95.9234C90.95 95.941 90.95 95.9764 90.9324 95.994C90.9324 96.0117 90.9147 96.0117 90.8971 96.0117C90.8794 96.0117 90.8794 96.0117 90.8618 95.994C89.873 95.0223 89.2903 94.5806 89.2903 94.5806C89.2903 94.5453 89.2903 94.51 89.2903 94.4923ZM106.17 141.011C104.581 139.81 102.409 137.301 100.043 134.138L96.3001 141.824L96.2647 141.806L100.026 134.103C96.1765 128.909 91.8505 121.912 88.9195 115.835L87.9837 117.743L87.9484 117.725L88.9019 115.782C88.584 115.128 88.2839 114.474 88.0014 113.838L87.1715 115.534L87.1538 115.552C87.1538 115.552 87.1538 115.552 87.1362 115.552C87.1185 115.552 87.1185 115.534 87.1185 115.517L87.9661 113.785C85.4941 108.255 84.47 103.838 86.4122 102.849C86.4122 102.849 88.3545 100.888 91.6033 102.655C95.5232 104.775 101.332 112.354 107.865 135.446C109.649 141.718 108.589 142.848 106.17 141.011ZM109.578 125.34C109.56 125.34 109.56 125.34 109.578 125.34C109.543 125.34 109.525 125.34 109.525 125.322C109.242 124.668 108.96 124.015 108.66 123.379C108.642 123.361 108.66 123.326 108.677 123.326C108.695 123.308 108.73 123.326 108.73 123.343C109.013 123.979 109.313 124.633 109.596 125.287C109.613 125.305 109.596 125.34 109.578 125.34ZM111.079 128.926C111.079 128.926 111.061 128.926 111.079 128.926C111.043 128.926 111.026 128.926 111.026 128.909C110.761 128.255 110.496 127.601 110.214 126.948C110.196 126.93 110.214 126.895 110.231 126.895C110.249 126.877 110.284 126.895 110.284 126.912C110.549 127.566 110.832 128.22 111.096 128.873C111.114 128.891 111.096 128.909 111.079 128.926ZM112.491 132.548C112.456 132.548 112.438 132.548 112.438 132.531C112.209 131.912 111.962 131.276 111.714 130.658C111.697 130.622 111.679 130.587 111.679 130.552C111.661 130.534 111.679 130.499 111.697 130.499C111.714 130.499 111.714 130.499 111.732 130.499C111.75 130.499 111.75 130.516 111.75 130.516C112.015 131.17 112.262 131.842 112.509 132.495C112.527 132.513 112.509 132.531 112.491 132.548ZM113.833 136.188C113.816 136.188 113.816 136.205 113.833 136.188C113.798 136.188 113.78 136.188 113.78 136.152C113.551 135.481 113.304 134.81 113.056 134.156C113.056 134.138 113.056 134.103 113.074 134.103C113.092 134.103 113.127 134.103 113.127 134.121C113.374 134.774 113.604 135.446 113.851 136.117C113.869 136.152 113.851 136.188 113.833 136.188ZM115.069 139.88C115.034 139.88 115.016 139.863 115.016 139.845C114.804 139.174 114.575 138.502 114.345 137.831C114.345 137.813 114.345 137.778 114.381 137.778C114.398 137.778 114.434 137.778 114.434 137.813C114.663 138.485 114.893 139.156 115.105 139.827C115.105 139.845 115.105 139.863 115.069 139.88ZM116.252 143.573C116.252 143.573 116.235 143.573 116.252 143.573C116.217 143.573 116.199 143.555 116.199 143.537C115.987 142.866 115.776 142.177 115.564 141.506C115.564 141.488 115.564 141.453 115.599 141.453C115.617 141.453 115.652 141.453 115.652 141.488C115.864 142.159 116.076 142.831 116.288 143.52C116.288 143.537 116.27 143.573 116.252 143.573ZM117.347 147.301C117.312 147.301 117.294 147.283 117.294 147.265C117.1 146.594 116.906 145.905 116.711 145.234C116.711 145.216 116.711 145.181 116.747 145.181C116.764 145.181 116.8 145.181 116.8 145.216C116.994 145.887 117.206 146.576 117.382 147.248C117.382 147.265 117.365 147.301 117.347 147.301ZM118.371 151.046C118.336 151.046 118.318 151.028 118.318 151.011C118.142 150.339 117.947 149.65 117.771 148.961C117.771 148.944 117.771 148.908 117.806 148.908C117.824 148.908 117.859 148.908 117.859 148.944C118.053 149.615 118.23 150.304 118.406 150.993C118.406 151.028 118.406 151.046 118.371 151.046ZM119.342 154.827C119.342 154.827 119.325 154.827 119.342 154.827C119.307 154.827 119.289 154.809 119.289 154.792C119.13 154.12 118.954 153.414 118.777 152.742C118.777 152.725 118.777 152.689 118.812 152.689C118.83 152.689 118.865 152.689 118.865 152.725C119.042 153.414 119.219 154.103 119.377 154.774C119.377 154.792 119.36 154.809 119.342 154.827ZM120.225 158.608C120.19 158.608 120.172 158.59 120.172 158.573C120.013 157.901 119.854 157.194 119.695 156.505C119.695 156.488 119.713 156.452 119.731 156.452C119.748 156.452 119.784 156.47 119.784 156.488C119.943 157.177 120.101 157.866 120.26 158.555C120.278 158.573 120.26 158.59 120.225 158.608Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M131.208 156.276C127.412 130.039 116.941 106.506 107.124 96.6124C103.151 92.6195 99.037 91.2061 95.2585 91.1178C92.9984 91.0648 90.8619 91.4888 88.955 92.1249C90.0674 93.0789 91.8507 94.6513 93.9166 96.7361C97.5186 100.376 101.968 105.499 105.129 111.347C107.512 115.746 109.825 120.746 112.032 126.241C116.588 137.548 120.755 150.958 124.269 165.675C124.357 165.834 124.445 165.975 124.533 166.134C124.498 166.187 124.445 166.24 124.41 166.293C124.357 166.081 124.304 165.887 124.269 165.675C123.615 164.579 122.838 163.413 121.903 162.177C121.408 161.523 120.861 160.852 120.261 160.145C117.488 156.912 113.692 153.29 108.43 149.474C108.042 149.191 107.636 148.908 107.23 148.608C101.633 144.668 94.4816 140.516 85.353 136.329C86.4831 138.997 87.7014 141.735 88.955 144.562C95.3468 147.672 101.509 151.152 107.018 154.809C109.649 156.558 112.121 158.343 114.398 160.127C117.241 162.371 119.766 164.632 121.885 166.859C122.256 167.247 122.591 167.618 122.927 168.007C123.474 168.625 123.986 169.226 124.48 169.844C124.869 170.339 125.222 170.851 125.575 171.364C126.334 172.512 126.988 173.749 127.553 175.003C130.396 181.381 130.837 188.678 131.013 193.024C131.013 193.166 130.996 193.325 130.978 193.484C131.543 192.035 131.949 190.25 132.161 188.077C133.185 177.494 132.726 166.682 131.208 156.276ZM120.631 144.173L120.596 144.156L123.121 138.979L123.156 138.997L120.631 144.173Z"
                            fill="#D68080"></path>
                        <path
                            d="M124.515 166.117C124.427 165.958 124.339 165.816 124.25 165.657C124.303 165.869 124.356 166.064 124.392 166.276C124.427 166.223 124.48 166.17 124.515 166.117Z"
                            fill="#D68080"></path>
                        <path
                            d="M71.8105 137.937C71.3691 138.078 70.8924 138.29 70.7158 138.573L71.1396 138.82C71.3691 138.432 71.581 138.131 71.8105 137.937Z"
                            fill="#994848"></path>
                        <path
                            d="M67.4138 156.982C67.5374 156.399 67.661 155.781 67.7493 155.145C67.9259 153.979 68.0495 152.795 68.1554 151.735C67.8376 151.382 67.5021 151.046 67.1843 150.693C66.6899 150.145 66.1778 149.615 65.7011 149.067C64.0943 153.361 63.0879 157.777 64.3239 160.127H66.1955C66.7429 159.368 67.1313 158.237 67.4138 156.982Z"
                            fill="#994848"></path>
                        <path
                            d="M65.1183 161.064C65.5421 160.887 65.8952 160.569 66.1954 160.145H64.3237C64.5356 160.551 64.8005 160.887 65.1359 161.152C65.1183 161.081 65.1183 161.064 65.1183 161.064Z"
                            fill="#994848"></path>
                        <path
                            d="M67.3605 136.629L65.0298 135.287C65.0298 135.287 70.0443 129.403 67.8019 129.191C67.7137 129.191 67.643 129.174 67.5547 129.174C64.8533 129.174 62.2577 133.396 58.4968 137.636C57.8788 138.343 58.6027 140.004 60.0683 142.142C60.2625 142.424 60.4744 142.725 60.6862 143.025C60.4214 142.407 60.7039 142.725 61.8339 144.545C62.3107 145.145 62.8227 145.764 63.3524 146.4C63.5643 146.576 63.7585 146.7 63.9528 146.806C67.6254 148.626 69.2498 137.725 69.2498 137.725L67.3605 136.629Z"
                            fill="#EFE1C5"></path>
                        <path
                            d="M60.6684 143.043C61.0215 143.537 61.41 144.032 61.8161 144.562C60.6861 142.742 60.4036 142.424 60.6684 143.043Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M63.3525 146.4C63.5291 146.612 63.7057 146.806 63.8822 147.018C63.8999 146.947 63.9176 146.859 63.9529 146.788C63.7586 146.7 63.5644 146.576 63.3525 146.4Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M70.4331 139.05C70.539 138.873 70.6273 138.714 70.7156 138.573L69.2324 137.725C69.2324 137.725 67.608 148.626 63.9354 146.806C63.9177 146.877 63.9001 146.965 63.8647 147.036C64.4474 147.707 65.0478 148.396 65.6657 149.085C66.7252 146.241 68.0494 143.449 69.1441 141.329C69.6562 140.004 70.0976 139.35 70.4331 139.05Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M70.7332 138.555C70.6449 138.697 70.539 138.856 70.4507 139.032C70.8921 138.644 71.157 138.803 71.1746 138.803L70.7332 138.555Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M65.6831 149.067C66.1775 149.615 66.6719 150.163 67.1663 150.693C67.8372 145.923 68.5259 143.043 69.1615 141.311C68.0668 143.431 66.7425 146.223 65.6831 149.067Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M69.1792 141.329C69.6559 140.428 70.0797 139.651 70.4328 139.05C70.0974 139.35 69.6559 140.004 69.1792 141.329Z"
                            fill="#E0C4B1"></path>
                        <path opacity="0.31"
                              d="M69.1792 141.329C69.6559 140.428 70.0797 139.651 70.4328 139.05C70.0974 139.35 69.6559 140.004 69.1792 141.329Z"
                              fill="#994848"></path>
                        <path
                            d="M71.1569 138.803C71.1569 138.803 70.8744 138.644 70.4329 139.032C70.0798 139.633 69.6384 140.41 69.1793 141.311C68.5437 143.043 67.855 145.923 67.1841 150.693C67.5019 151.046 67.8374 151.382 68.1552 151.735C68.1729 151.488 68.2082 151.258 68.2258 151.011C68.5613 147.848 69.6913 141.417 71.1569 138.803Z"
                            fill="#E0C4B1"></path>
                        <path opacity="0.31"
                              d="M71.1569 138.803C71.1569 138.803 70.8744 138.644 70.4329 139.032C70.0798 139.633 69.6384 140.41 69.1793 141.311C68.5437 143.043 67.855 145.923 67.1841 150.693C67.5019 151.046 67.8374 151.382 68.1552 151.735C68.1729 151.488 68.2082 151.258 68.2258 151.011C68.5613 147.848 69.6913 141.417 71.1569 138.803Z"
                              fill="#994848"></path>
                        <path
                            d="M130.042 195.268C130.095 195.268 130.113 195.268 130.113 195.268C130.536 194.667 130.837 194.031 130.942 193.466C130.695 194.102 130.413 194.667 130.095 195.162C130.095 195.215 130.06 195.233 130.042 195.268Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M72.5693 137.689C72.3045 137.636 72.0573 137.725 71.8101 137.937C72.1279 137.831 72.4104 137.778 72.5516 137.742C72.5693 137.725 72.5693 137.707 72.5693 137.689Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M72.5697 139.633C72.605 138.873 72.6403 138.308 72.6403 138.007C72.5344 138.272 72.3755 138.75 72.1636 139.403L72.5697 139.633Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M127.535 174.986C126.97 173.731 126.317 172.512 125.557 171.346C125.222 170.834 124.851 170.321 124.463 169.827C123.986 169.226 123.474 168.608 122.909 167.989C122.573 167.618 122.22 167.23 121.867 166.841C119.748 164.615 117.223 162.353 114.381 160.11C112.103 158.325 109.631 156.541 107 154.792C101.491 151.134 95.3289 147.654 88.9371 144.544C83.6047 141.947 78.1135 139.633 72.7458 137.725C72.7458 137.725 72.7105 137.813 72.6575 137.972C72.6399 138.29 72.6222 138.856 72.5869 139.598L72.1808 139.368C72.1455 139.474 72.1102 139.598 72.0749 139.721C72.0572 139.757 72.0219 139.792 71.9866 139.792H71.9689C71.916 139.774 71.8983 139.721 71.9159 139.686C71.9513 139.545 72.0042 139.421 72.0395 139.297C72.3044 138.449 72.5163 137.901 72.5869 137.725C72.4457 137.76 72.1455 137.831 71.8453 137.919C71.6158 138.113 71.4039 138.414 71.1744 138.785C69.7089 141.382 68.5965 147.813 68.2433 151.011C68.2257 151.24 68.1904 151.488 68.1727 151.735C68.0668 152.795 67.9432 153.979 67.7666 155.145C67.9785 155.746 68.1904 156.346 68.4199 156.947C68.4376 156.859 68.4729 156.77 68.4905 156.664C68.5082 156.611 68.5435 156.594 68.5965 156.594C68.6494 156.611 68.6671 156.647 68.6671 156.7C68.6141 156.876 68.5788 157.035 68.5258 157.194C68.773 157.848 69.0556 158.484 69.3381 159.103C69.497 159.438 69.6382 159.774 69.7971 160.11C75.4473 172 85.4234 179.915 95.6467 185.162C96.3883 185.551 97.1475 185.922 97.8891 186.275C104.14 189.243 110.39 191.257 115.687 192.618C123.562 194.632 129.371 195.18 130.06 195.233C130.077 195.197 130.095 195.18 130.113 195.144C130.431 194.65 130.713 194.084 130.96 193.448C130.996 193.289 131.013 193.13 130.996 192.989C130.819 188.66 130.378 181.381 127.535 174.986ZM70.8919 143.467C71.0508 142.778 71.2273 142.089 71.4039 141.4C71.4216 141.347 71.4569 141.329 71.5098 141.329C71.5628 141.347 71.5805 141.382 71.5805 141.435C71.4039 142.106 71.2273 142.795 71.0684 143.484C71.0508 143.52 71.0155 143.555 70.9801 143.555H70.9625C70.9095 143.555 70.8742 143.502 70.8919 143.467ZM69.4263 153.078C69.3027 153.785 69.1791 154.421 69.0556 154.986C69.0556 155.021 69.0026 155.057 68.9673 155.057H68.9496C68.8966 155.039 68.879 155.004 68.879 154.951C69.0026 154.332 69.1262 153.679 69.2674 152.919C69.2674 152.901 69.2674 152.884 69.2674 152.866C69.2674 152.813 69.3204 152.778 69.3734 152.795C69.4263 152.795 69.4617 152.848 69.444 152.901C69.444 152.972 69.4263 153.025 69.4263 153.078ZM70.0443 157.76C70.0267 157.76 70.0267 157.777 70.009 157.777C69.9914 157.777 69.956 157.76 69.956 157.742L69.9031 157.671L69.8324 157.565C69.8148 157.53 69.8324 157.495 69.8501 157.477C69.8854 157.459 69.9207 157.477 69.9384 157.495V157.512L70.0443 157.689C70.0796 157.707 70.062 157.742 70.0443 157.76ZM70.062 149.085C69.956 149.774 69.8501 150.463 69.7442 151.152C69.7442 151.187 69.6912 151.223 69.6559 151.223H69.6382C69.5853 151.223 69.5499 151.17 69.5676 151.117C69.6735 150.428 69.7795 149.739 69.8854 149.05V149.032C69.8854 148.979 69.9384 148.944 69.9914 148.961C70.0443 148.961 70.0796 149.014 70.062 149.067V149.085ZM70.5034 146.294C70.4504 146.629 70.3975 146.965 70.3445 147.318C70.3445 147.354 70.2915 147.389 70.2562 147.389H70.2386C70.1856 147.389 70.1503 147.336 70.1679 147.283C70.2209 146.93 70.2739 146.594 70.3268 146.258C70.3798 145.887 70.4504 145.534 70.5211 145.198C70.5387 145.145 70.574 145.128 70.627 145.128C70.68 145.145 70.7153 145.18 70.6976 145.234C70.627 145.569 70.574 145.923 70.5034 146.294ZM72.1278 161.046C72.1102 161.046 72.1102 161.064 72.0925 161.064C72.0749 161.064 72.0572 161.046 72.0395 161.028C71.8453 160.728 71.6511 160.445 71.4392 160.145C71.245 159.845 71.0508 159.544 70.8742 159.262C70.8565 159.226 70.8565 159.191 70.8919 159.173C70.9272 159.156 70.9625 159.156 70.9801 159.191C71.1744 159.509 71.3862 159.827 71.5981 160.145C71.7747 160.41 71.9513 160.693 72.1455 160.958C72.1631 160.975 72.1631 161.028 72.1278 161.046ZM74.4232 164.173C74.4056 164.191 74.4056 164.191 74.3879 164.191C74.3702 164.191 74.3526 164.191 74.3349 164.173C73.8935 163.608 73.4697 163.042 73.0636 162.477C73.046 162.442 73.046 162.406 73.0813 162.389C73.1166 162.371 73.1519 162.371 73.1696 162.406C73.5757 162.972 74.0171 163.537 74.4409 164.102C74.4585 164.12 74.4409 164.155 74.4232 164.173ZM76.9128 167.159C76.8952 167.177 76.8775 167.177 76.8775 167.177C76.8598 167.177 76.8422 167.177 76.8245 167.159C76.3655 166.629 75.8887 166.081 75.4473 165.551C75.4296 165.516 75.4296 165.481 75.4473 165.463C75.4826 165.445 75.5179 165.445 75.5356 165.463C75.977 166.011 76.4537 166.541 76.9128 167.071C76.9305 167.088 76.9305 167.141 76.9128 167.159ZM79.5613 169.986C79.5437 170.003 79.526 170.003 79.5084 170.003C79.4907 170.003 79.4731 170.003 79.4554 169.986C78.961 169.491 78.4666 168.979 77.9722 168.466C77.9546 168.431 77.9546 168.396 77.9722 168.378C78.0075 168.36 78.0429 168.36 78.0605 168.378C78.5372 168.89 79.0316 169.403 79.526 169.897C79.5967 169.915 79.5967 169.968 79.5613 169.986ZM82.3864 172.654C82.3688 172.671 82.3511 172.671 82.3335 172.671C82.3158 172.671 82.2981 172.671 82.2981 172.654C81.7684 172.177 81.2387 171.699 80.7443 171.222C80.709 171.205 80.709 171.152 80.7443 171.134C80.762 171.099 80.815 171.099 80.8326 171.134C81.3447 171.611 81.8744 172.106 82.3864 172.565C82.4217 172.583 82.4217 172.618 82.3864 172.654ZM85.3704 175.145C85.3528 175.162 85.3351 175.162 85.3175 175.162C85.2998 175.162 85.2821 175.162 85.2821 175.145C84.7348 174.703 84.1698 174.244 83.6401 173.802C83.6047 173.784 83.6047 173.731 83.6401 173.714C83.6754 173.696 83.7107 173.678 83.7283 173.714C84.258 174.173 84.8054 174.615 85.3704 175.056C85.3881 175.092 85.3881 175.127 85.3704 175.145ZM88.478 177.494C88.4604 177.512 88.4427 177.53 88.425 177.53C88.4074 177.53 88.3897 177.53 88.3897 177.512C87.8247 177.106 87.242 176.682 86.677 176.258C86.6417 176.24 86.6417 176.187 86.6594 176.169C86.677 176.134 86.73 176.134 86.7477 176.152C87.3127 176.576 87.8777 177 88.4604 177.406C88.478 177.424 88.4957 177.459 88.478 177.494ZM91.6916 179.668C91.6739 179.685 91.6562 179.703 91.6386 179.703C91.6209 179.703 91.6209 179.703 91.6033 179.685C91.0029 179.297 90.4026 178.908 89.8376 178.519C89.8023 178.502 89.8023 178.466 89.8199 178.431C89.8376 178.396 89.8906 178.395 89.9082 178.413C90.4909 178.802 91.0736 179.191 91.6739 179.579C91.6916 179.597 91.7092 179.632 91.6916 179.668ZM95.011 181.682C94.9934 181.699 94.9757 181.717 94.9581 181.717C94.9404 181.717 94.9404 181.717 94.9227 181.717C94.3048 181.364 93.7044 180.993 93.1041 180.639C93.0688 180.622 93.0688 180.586 93.0864 180.551C93.1041 180.516 93.1394 180.516 93.1747 180.533C93.7751 180.904 94.393 181.258 94.9934 181.611C95.011 181.611 95.0287 181.664 95.011 181.682ZM98.4188 183.554C98.4011 183.572 98.3835 183.59 98.3658 183.59C98.3482 183.59 98.3482 183.59 98.3305 183.59C98.1539 183.501 97.9774 183.413 97.8008 183.307C97.3417 183.06 96.9003 182.83 96.4589 182.583C96.4236 182.565 96.4236 182.53 96.4412 182.494C96.4589 182.459 96.4942 182.459 96.5295 182.477C96.9886 182.724 97.4477 182.971 97.9244 183.219C98.0833 183.307 98.2422 183.395 98.4011 183.466C98.4188 183.484 98.4365 183.519 98.4188 183.554ZM101.915 185.268C101.897 185.286 101.88 185.304 101.862 185.304C101.844 185.304 101.844 185.304 101.827 185.304C101.544 185.162 101.244 185.021 100.944 184.897C100.591 184.738 100.255 184.561 99.902 184.385C99.8666 184.367 99.849 184.332 99.8666 184.296C99.8843 184.261 99.9196 184.243 99.9549 184.261C100.326 184.438 100.714 184.632 101.085 184.809C101.35 184.932 101.597 185.056 101.862 185.18C101.915 185.197 101.932 185.233 101.915 185.268ZM105.464 186.841C105.446 186.858 105.429 186.876 105.411 186.876H105.393C104.74 186.611 104.087 186.328 103.451 186.028C103.416 186.01 103.398 185.975 103.416 185.94C103.433 185.904 103.469 185.887 103.504 185.904C104.14 186.187 104.811 186.47 105.446 186.735C105.464 186.77 105.482 186.805 105.464 186.841ZM109.083 188.272C109.066 188.307 109.048 188.307 109.013 188.307H108.995C108.324 188.06 107.671 187.795 107.018 187.547C106.982 187.53 106.965 187.494 106.982 187.459C107 187.424 107.035 187.406 107.071 187.424C107.724 187.689 108.377 187.936 109.048 188.183C109.083 188.183 109.101 188.236 109.083 188.272ZM112.756 189.544C112.738 189.579 112.721 189.597 112.685 189.597H112.668C111.997 189.385 111.326 189.137 110.655 188.908C110.62 188.89 110.602 188.855 110.62 188.819C110.637 188.784 110.673 188.766 110.708 188.784C111.361 189.014 112.032 189.243 112.685 189.455C112.703 189.455 112.703 189.455 112.721 189.473C112.738 189.473 112.756 189.508 112.756 189.544ZM116.464 190.692C116.464 190.727 116.429 190.745 116.393 190.745H116.376C115.687 190.551 115.016 190.339 114.345 190.127C114.31 190.109 114.292 190.074 114.31 190.038C114.328 190.003 114.363 189.985 114.398 190.003C115.069 190.215 115.758 190.409 116.429 190.604C116.464 190.621 116.482 190.657 116.464 190.692ZM120.225 191.699C120.225 191.734 120.19 191.752 120.154 191.752H120.137C119.448 191.575 118.759 191.399 118.088 191.222C118.053 191.204 118.035 191.169 118.035 191.134C118.053 191.098 118.088 191.081 118.124 191.081C118.795 191.257 119.501 191.452 120.172 191.611C120.207 191.628 120.243 191.664 120.225 191.699ZM120.507 182.883C119.748 187.848 114.275 186.576 107.353 182.318C107.088 182.159 106.823 181.982 106.541 181.805C105.181 180.94 103.769 179.968 102.339 178.908C97.377 175.251 92.0977 170.586 87.4892 165.887L86.2179 168.502L86.1826 168.484L87.4716 165.852C86.9595 165.322 86.4475 164.791 85.9531 164.279L82.9161 170.498L82.8808 170.48L85.9178 164.244C84.5935 162.848 83.3576 161.47 82.1922 160.127C80.4618 158.095 78.9257 156.134 77.6897 154.332C75.6592 151.364 74.4232 148.82 74.3526 147.071C74.3526 146.965 74.3526 146.859 74.3526 146.753C74.4056 145.463 75.1825 144.668 76.8598 144.527C76.8598 144.527 77.213 144.686 77.8663 145.004C80.144 146.117 86.059 149.067 92.7863 153.096C95.7173 154.845 98.7896 156.806 101.809 158.891C102.392 159.297 102.974 159.703 103.539 160.127C104.069 160.498 104.581 160.887 105.093 161.258C105.764 161.753 106.417 162.265 107.053 162.76C111.379 166.17 115.193 169.791 117.665 173.413C119.819 176.646 120.967 179.844 120.507 182.883ZM124.021 192.547C124.021 192.583 123.986 192.6 123.951 192.6C123.951 192.6 123.951 192.6 123.933 192.6C123.244 192.459 122.556 192.318 121.849 192.159C121.814 192.159 121.796 192.123 121.796 192.088C121.796 192.053 121.832 192.035 121.867 192.035C122.556 192.194 123.262 192.335 123.951 192.477C124.003 192.477 124.039 192.512 124.021 192.547ZM127.817 193.272C127.8 193.272 127.8 193.272 127.817 193.272C127.8 193.272 127.04 193.183 125.699 192.936C125.663 192.936 125.646 192.901 125.646 192.865C125.646 192.83 125.681 192.812 125.716 192.812C127.04 193.06 127.817 193.148 127.817 193.148C127.853 193.148 127.888 193.183 127.87 193.219C127.87 193.254 127.835 193.272 127.817 193.272Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M130.042 195.268C129.777 195.692 129.477 196.063 129.159 196.381C129.512 196.045 129.83 195.657 130.113 195.268C130.113 195.268 130.095 195.268 130.042 195.268Z"
                            fill="#D68080"></path>
                        <path
                            d="M127.959 197.335C127.712 197.476 127.465 197.582 127.2 197.688C127.429 197.618 127.694 197.494 127.959 197.335Z"
                            fill="#D68080"></path>
                        <path
                            d="M115.67 192.636C110.373 191.275 104.122 189.261 97.872 186.293C94.6408 187.689 91.286 188.855 87.8076 189.756C96.5124 194.95 108.36 198.572 124.375 197.918C121.85 197.529 118.884 195.727 115.67 192.636Z"
                            fill="#D68080"></path>
                        <path
                            d="M95.6295 185.197C93.1752 187.212 90.8268 188.66 87.7192 189.72C87.7546 189.738 87.7722 189.756 87.8075 189.773C91.2683 188.872 94.6407 187.706 97.8719 186.311C97.1303 185.94 96.3711 185.569 95.6295 185.197Z"
                            fill="#D68080"></path>
                        <path
                            d="M68.7905 160.145H69.797C69.638 159.809 69.4791 159.474 69.3379 159.138C69.1437 159.509 68.9671 159.845 68.7905 160.145Z"
                            fill="#D68080"></path>
                        <path
                            d="M69.7796 160.145H68.7731C67.9433 161.47 66.9368 162.088 65.7185 161.523C65.6832 161.523 65.6479 161.541 65.5949 161.541C65.5949 161.541 65.5949 161.541 65.5772 161.541C65.5419 161.541 65.489 161.505 65.489 161.47C65.489 161.452 65.489 161.435 65.5066 161.417C65.3654 161.346 65.2241 161.258 65.1182 161.152C65.489 162.548 70.3269 179.279 87.7012 189.703C90.8088 188.66 93.1572 187.194 95.6115 185.18C85.4058 179.933 75.4297 172.018 69.7796 160.145Z"
                            fill="#D68080"></path>
                        <path
                            d="M130.042 195.268C129.353 195.215 123.544 194.65 115.669 192.653C118.865 195.745 121.849 197.547 124.374 197.918C125.133 197.883 125.893 197.847 126.67 197.794C126.829 197.777 127.005 197.741 127.182 197.688C127.447 197.6 127.694 197.476 127.941 197.335C127.959 197.317 127.976 197.317 127.994 197.3C127.994 197.3 127.994 197.3 128.012 197.3C128.4 197.052 128.806 196.734 129.177 196.381C129.495 196.063 129.777 195.692 130.042 195.268Z"
                            fill="#D68080"></path>
                        <path
                            d="M68.5261 157.23C68.3672 157.795 68.2083 158.307 68.0317 158.767C68.014 158.802 67.9787 158.82 67.9434 158.82C67.9258 158.82 67.9258 158.82 67.9081 158.82C67.8551 158.802 67.8375 158.749 67.8551 158.714C68.0494 158.201 68.2259 157.636 68.4025 156.965C68.173 156.382 67.9611 155.781 67.7492 155.163C67.6609 155.781 67.555 156.399 67.4137 157C67.1312 158.254 66.7428 159.385 66.1777 160.163H68.7733C68.9675 159.862 69.1441 159.527 69.303 159.156C69.0381 158.502 68.7733 157.866 68.5261 157.23Z"
                            fill="#D68080"></path>
                        <path
                            d="M65.5955 161.364C66.1428 161.293 66.6372 160.922 67.0786 160.251C67.1139 160.216 67.1669 160.198 67.2022 160.233C67.2375 160.269 67.2552 160.322 67.2199 160.357C66.7785 161.028 66.2664 161.417 65.7191 161.523C66.9374 162.088 67.9438 161.47 68.7737 160.145H66.1781C65.878 160.569 65.5248 160.887 65.1011 161.064C65.1011 161.064 65.1011 161.099 65.1187 161.152C65.2423 161.24 65.3659 161.329 65.5072 161.417C65.5425 161.399 65.5601 161.382 65.5955 161.364Z"
                            fill="#D68080"></path>
                        <path
                            d="M11.8126 175.374C12.2364 173.484 12.6778 171.629 13.1369 169.791C13.5783 168.025 14.0197 166.293 14.4788 164.562C14.3728 164.438 14.2845 164.297 14.1786 164.155C13.6489 165.604 13.2075 167.053 12.872 168.502C12.1304 171.735 11.5654 174.544 11.3535 176.876C11.4065 176.929 11.4595 176.982 11.4948 177.035C11.5654 176.505 11.6713 175.94 11.8126 175.374Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M15.3966 161.17C14.9375 162.159 14.5314 163.166 14.1606 164.155C14.2666 164.297 14.3549 164.42 14.4608 164.562C14.7786 163.431 15.0965 162.3 15.3966 161.17Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M28.6393 178.449C28.3038 178.731 27.9683 179.014 27.6329 179.279C27.6152 179.297 27.5975 179.297 27.5975 179.297C27.5799 179.297 27.5622 179.297 27.5446 179.279C27.5269 179.244 27.5269 179.208 27.5622 179.191C27.8977 178.926 28.2155 178.661 28.551 178.378C27.4386 177.547 26.3439 176.699 25.2669 175.798C23.4659 176.982 21.5413 177.724 19.5814 177.848C15.538 178.131 15.3261 175.021 16.9328 170.622C15.6086 170.427 14.3196 170.162 13.1366 169.791C12.6776 171.629 12.2361 173.484 11.8124 175.374C11.6888 175.957 11.5828 176.505 11.5122 177.053C14.8317 180.569 17.9393 182.441 20.835 183.06C20.835 183.042 20.8527 183.007 20.8703 183.007C21.5236 182.759 22.1769 182.477 22.8126 182.176C22.8479 182.159 22.8832 182.176 22.9008 182.212C22.9185 182.247 22.9008 182.282 22.8655 182.3C22.2475 182.6 21.6296 182.865 21.0116 183.113C24.7371 183.855 28.0919 182.565 31.0583 180.145C30.2284 179.579 29.4339 179.014 28.6393 178.449ZM26.2203 180.321C25.6376 180.728 25.0373 181.116 24.4193 181.452C24.4017 181.452 24.4017 181.452 24.384 181.452C24.3664 181.452 24.331 181.434 24.331 181.417C24.3134 181.381 24.331 181.346 24.3487 181.328C24.949 180.975 25.5494 180.604 26.132 180.198C26.1673 180.18 26.2027 180.18 26.2203 180.215C26.2556 180.268 26.238 180.304 26.2203 180.321Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M31.7644 169.155C31.5525 169.473 31.323 169.774 31.0934 170.074L31.0405 170.498C31.0405 170.498 30.9345 170.516 30.7403 170.533C29.0982 172.654 27.2442 174.473 25.249 175.781C26.3084 176.664 27.4032 177.53 28.5332 178.36C28.7451 178.184 28.957 177.989 29.1512 177.812C29.1865 177.795 29.2218 177.795 29.2395 177.812C29.2571 177.848 29.2571 177.883 29.2395 177.901C29.0452 178.078 28.8334 178.254 28.6391 178.431C29.416 179.014 30.2282 179.562 31.0228 180.109C31.4819 179.738 31.9233 179.332 32.3647 178.908C32.1352 175.604 31.9233 172.353 31.7644 169.155ZM30.5284 176.682C30.5107 176.699 30.4931 176.699 30.4754 176.699C30.4578 176.699 30.4401 176.699 30.4225 176.682C30.4048 176.664 30.4048 176.611 30.4225 176.593C30.9169 176.099 31.3936 175.586 31.8703 175.056C31.888 175.021 31.9409 175.021 31.9586 175.056C31.9939 175.074 31.9939 175.127 31.9586 175.145C31.5172 175.675 31.0228 176.205 30.5284 176.682Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M36.2846 160.145H40.8577C41.1049 159.544 41.3521 158.926 41.5817 158.325C41.5993 158.29 41.6346 158.272 41.67 158.29C41.7053 158.308 41.7229 158.343 41.7053 158.378C41.4757 158.961 41.2462 159.562 40.999 160.145H43.4886C44.1243 158.52 44.654 157.035 45.0601 155.781C44.654 155.304 44.2302 154.739 43.8064 154.085C43.7888 154.05 43.7888 154.014 43.8241 153.997C43.8594 153.979 43.8947 153.979 43.9124 154.014C44.3185 154.633 44.7069 155.18 45.0954 155.64C45.2896 155.074 45.4485 154.544 45.5898 154.103C45.2366 153.484 44.9012 152.795 44.548 152.053V152.036C44.3891 151.682 44.2302 151.329 44.0713 150.958L41.7936 145.923L39.4099 140.375C39.3569 140.251 39.304 140.128 39.251 139.986V139.969C38.9155 139.156 38.6683 138.308 38.58 137.318C38.4564 135.976 39.816 135.022 39.816 135.022C39.4452 135.092 39.0568 135.216 38.6506 135.41C38.3505 135.552 38.0503 135.711 37.7502 135.87C37.7678 135.887 37.7678 135.923 37.7502 135.94C37.7502 135.94 37.503 136.276 37.503 137.142C37.503 137.389 37.5206 137.672 37.5736 137.972C37.5736 138.007 37.5559 138.043 37.5206 138.043C37.5206 138.043 37.5206 138.043 37.503 138.043C37.4676 138.043 37.45 138.025 37.4323 137.99C37.397 137.689 37.3617 137.407 37.3617 137.142C37.3617 136.488 37.4853 136.135 37.5736 135.976C36.7084 136.453 35.8256 137 34.9074 137.619L33.9893 145.428C34.4307 145.251 34.7485 145.163 34.7485 145.163C38.4564 147.283 38.4917 153.608 36.2846 160.145ZM42.9412 154.65C42.9412 154.65 42.7294 155.428 42.2879 156.682C42.2703 156.717 42.2526 156.735 42.2173 156.735H42.1997C42.1644 156.717 42.1467 156.682 42.1644 156.647C42.5881 155.392 42.8 154.615 42.8 154.615C42.8177 154.58 42.853 154.562 42.8883 154.562C42.9412 154.58 42.9589 154.615 42.9412 154.65ZM41.9525 150.587C41.9878 150.569 42.0231 150.587 42.0408 150.622C42.3586 151.293 42.6941 151.912 43.0295 152.495C43.0472 152.53 43.0295 152.566 43.0119 152.583C42.9942 152.583 42.9942 152.583 42.9766 152.583C42.9589 152.583 42.9236 152.566 42.9236 152.548C42.6058 151.965 42.2703 151.329 41.9348 150.657C41.8995 150.64 41.9172 150.604 41.9525 150.587ZM40.381 147.036C40.4163 147.018 40.4516 147.036 40.4693 147.071C40.7342 147.742 41.0167 148.396 41.2992 149.014C41.3168 149.05 41.2992 149.085 41.2639 149.103C41.2639 149.103 41.2462 149.103 41.2285 149.103C41.2109 149.103 41.1756 149.085 41.1756 149.067C40.8931 148.449 40.6106 147.778 40.3457 147.106C40.328 147.089 40.3457 147.053 40.381 147.036ZM39.0214 143.396C39.0568 143.378 39.0921 143.396 39.1097 143.431C39.3393 144.103 39.5865 144.774 39.8337 145.428C39.8513 145.463 39.8337 145.499 39.7983 145.516H39.7807C39.7454 145.516 39.7277 145.499 39.7101 145.481C39.4629 144.827 39.2157 144.156 38.9861 143.484C38.9685 143.431 38.9861 143.396 39.0214 143.396ZM37.8738 139.668C37.9091 139.651 37.9444 139.686 37.962 139.721C38.1386 140.357 38.3328 141.046 38.5624 141.753C38.58 141.788 38.5624 141.824 38.5271 141.841H38.5094C38.4741 141.841 38.4564 141.824 38.4388 141.788C38.2092 141.082 38.015 140.393 37.8384 139.757C37.8031 139.721 37.8384 139.686 37.8738 139.668Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M39.8691 135.039C39.8867 135.039 39.9043 135.039 39.9218 135.022C39.9043 135.039 39.8867 135.039 39.8691 135.039Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M43.4887 160.145H40.9991C40.9638 160.216 40.9461 160.286 40.9108 160.357C40.8931 160.375 40.8755 160.392 40.8578 160.392H40.8402C40.8049 160.375 40.7872 160.339 40.8049 160.304C40.8225 160.251 40.8402 160.198 40.8755 160.145H36.3024C35.243 163.254 33.6892 166.399 31.7822 169.173C31.9411 172.353 32.153 175.622 32.4002 178.943C32.4708 178.873 32.5415 178.802 32.6121 178.731C32.4355 177.3 33.1418 175.993 34.2012 174.862C35.1723 173.82 36.4613 172.919 37.6443 172.212C40.0986 168.219 42.0761 163.82 43.4887 160.145ZM39.1981 163.837C39.4982 163.201 39.8161 162.565 40.0986 161.912C40.1162 161.876 40.1516 161.859 40.1869 161.876C40.2222 161.894 40.2398 161.929 40.2222 161.965C39.9397 162.618 39.6218 163.254 39.3217 163.89C39.304 163.908 39.2864 163.926 39.2687 163.926C39.2511 163.926 39.2511 163.926 39.2334 163.926C39.1981 163.908 39.1804 163.873 39.1981 163.837ZM34.4307 172.106C34.007 172.689 33.5656 173.254 33.1418 173.784C33.1241 173.802 33.1065 173.802 33.0888 173.802C33.0712 173.802 33.0535 173.802 33.0535 173.784C33.0182 173.767 33.0182 173.714 33.0359 173.696C33.4773 173.166 33.901 172.601 34.3248 172.018C34.3425 171.982 34.3954 171.982 34.4131 172C34.4307 172.035 34.4484 172.071 34.4307 172.106ZM36.5849 168.873C36.2141 169.473 35.8256 170.074 35.4372 170.657C35.4195 170.675 35.4019 170.692 35.3842 170.692C35.3666 170.692 35.3666 170.692 35.3489 170.675C35.3136 170.657 35.3136 170.622 35.3312 170.586C35.7197 170.003 36.1081 169.42 36.4789 168.802C36.4966 168.767 36.5319 168.767 36.5672 168.784C36.6025 168.802 36.6025 168.837 36.5849 168.873ZM37.4324 167.371C37.4147 167.371 37.4147 167.371 37.3971 167.371C37.3618 167.353 37.3618 167.318 37.3794 167.283C37.7326 166.682 38.068 166.046 38.4035 165.428C38.4212 165.392 38.4565 165.375 38.4918 165.392C38.5271 165.41 38.5448 165.445 38.5271 165.481C38.1916 166.117 37.8562 166.735 37.503 167.353C37.4854 167.371 37.4677 167.371 37.4324 167.371Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M17.7805 168.555C16.6328 167.265 15.538 165.94 14.4786 164.562C14.0196 166.276 13.5781 168.025 13.1367 169.791C14.3197 170.162 15.6087 170.427 16.9329 170.622C17.1801 169.95 17.4626 169.261 17.7805 168.555Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M17.7805 168.555C18.3279 167.353 18.9635 166.064 19.6874 164.774V160.145H22.4066C22.6361 159.792 22.848 159.438 23.0775 159.085L21.4531 154.756L21.4884 154.739L23.0952 159.032C23.3954 158.555 23.6955 158.096 24.0133 157.618L22.8127 154.403L22.848 154.385L24.031 157.565C27.015 153.043 30.0873 148.944 31.8353 146.771C32.0295 144.191 32.3297 141.665 32.7005 139.227C26.1851 144.315 19.3166 152.513 15.3792 161.152C15.0613 162.265 14.7612 163.396 14.4434 164.544C15.5204 165.94 16.6328 167.265 17.7805 168.555Z"
                            fill="#EA8C8C"></path>
                        <path d="M22.4066 160.145H19.6875V164.774C20.5174 163.254 21.4355 161.682 22.4066 160.145Z"
                              fill="#EA8C8C"></path>
                        <path
                            d="M31.0409 170.498L31.0939 170.074C30.9703 170.233 30.8643 170.374 30.7407 170.533C30.9349 170.516 31.0409 170.498 31.0409 170.498Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M33.9895 145.446L34.9077 137.636C34.1837 138.131 33.4598 138.661 32.7182 139.244C32.3474 141.7 32.0473 144.209 31.853 146.788C32.3651 146.17 33.3185 145.711 33.9895 145.446Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M32.5945 178.714C33.0713 178.237 33.548 177.724 34.0071 177.194L34.2013 174.827C33.1242 175.975 32.4356 177.282 32.5945 178.714Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M34.2011 174.827L34.0068 177.194C35.3134 175.675 36.5318 173.979 37.6441 172.177C36.4435 172.901 35.1722 173.784 34.2011 174.827Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M11.4945 177.053C11.4415 177 11.3886 176.947 11.3532 176.894C11.212 178.608 11.2473 180.074 11.5475 181.293C11.3003 180.056 11.2826 178.625 11.4945 177.053Z"
                            fill="#D68080"></path>
                        <path
                            d="M33.8127 181.24C33.6538 181.364 33.4948 181.487 33.3359 181.611C34.2364 182.159 35.1369 182.689 36.0551 183.201C36.0727 183.183 36.0727 183.183 36.0904 183.166C35.1016 182.512 34.36 181.876 33.8127 181.24Z"
                            fill="#D68080"></path>
                        <path
                            d="M50.7453 152.053C49.6859 156.965 48.3263 157.495 46.8785 155.905C46.4724 155.463 46.0486 154.827 45.6249 154.085C45.4836 154.544 45.307 155.057 45.1305 155.622C45.1481 155.64 45.1658 155.675 45.2011 155.693C45.2187 155.728 45.2187 155.763 45.2011 155.781C45.1834 155.799 45.1658 155.799 45.1658 155.799C45.1481 155.799 45.1305 155.799 45.1128 155.781C45.1128 155.781 45.1128 155.763 45.0951 155.763C44.6714 157 44.1593 158.484 43.5237 160.127C42.0935 163.802 40.1336 168.201 37.6616 172.177C36.5493 173.961 35.3486 175.675 34.0243 177.194C33.5653 177.724 33.1062 178.236 32.6118 178.714C32.5412 178.784 32.4705 178.855 32.3999 178.926C31.9585 179.35 31.5171 179.756 31.058 180.127C28.0917 182.547 24.7369 183.837 21.0113 183.095C20.976 183.113 20.9583 183.113 20.923 183.13H20.9053C20.87 183.13 20.8524 183.113 20.8347 183.095C20.8347 183.077 20.8347 183.077 20.8347 183.06C17.939 182.441 14.8314 180.569 11.5119 177.053C11.3 178.643 11.3177 180.056 11.5649 181.293C12.4124 184.632 14.8491 186.099 14.8491 186.099C14.8491 186.099 16.1027 186.752 18.1685 187.282C22.1766 188.307 29.257 188.872 36.0725 183.201C35.1544 182.689 34.2539 182.159 33.3534 181.611C33.5123 181.487 33.6712 181.364 33.8301 181.24C34.3775 181.876 35.1191 182.53 36.0902 183.183C39.9747 179.95 43.7709 174.685 46.8785 166.329C47.5848 164.438 48.2557 162.371 48.8737 160.145C49.5093 157.866 50.1097 155.41 50.657 152.76C50.71 152.477 50.763 152.177 50.7806 151.877C50.763 151.93 50.763 151.983 50.7453 152.053ZM15.4141 184.455C15.2375 184.473 15.0433 184.491 14.8667 184.508C14.8314 184.508 14.7961 184.491 14.7961 184.455C14.7961 184.42 14.8137 184.385 14.8491 184.385C15.0256 184.367 15.2198 184.349 15.3964 184.332C15.4317 184.332 15.467 184.349 15.467 184.385C15.4847 184.42 15.467 184.438 15.4141 184.455ZM19.2279 183.696C18.557 183.89 17.8507 184.067 17.1621 184.19C17.1621 184.19 17.1621 184.19 17.1444 184.19C17.1091 184.19 17.0915 184.173 17.0738 184.137C17.0738 184.102 17.0915 184.067 17.1268 184.067C17.8154 183.943 18.504 183.766 19.175 183.572C19.2103 183.554 19.2456 183.59 19.2633 183.625C19.2809 183.643 19.2633 183.678 19.2279 183.696ZM48.3617 157.689C48.2734 157.707 48.2027 157.707 48.1145 157.707C47.9026 157.707 47.673 157.671 47.4435 157.601C47.0904 157.495 46.7372 157.3 46.3664 157.035C46.3311 157.018 46.3311 156.965 46.3488 156.947C46.3664 156.929 46.4194 156.912 46.4371 156.929C46.7725 157.177 47.0904 157.353 47.3905 157.459C47.6377 157.548 47.8673 157.583 48.0968 157.583C48.1674 157.583 48.2557 157.583 48.3263 157.565C48.3617 157.565 48.397 157.583 48.397 157.618C48.4323 157.654 48.397 157.689 48.3617 157.689Z"
                            fill="#D68080"></path>
                        <path
                            d="M44.5835 152.036C44.9366 152.778 45.2721 153.467 45.6252 154.085C45.7135 153.802 45.8018 153.537 45.8724 153.29C45.5899 152.53 45.3074 151.771 45.0249 151.011C44.9366 151.205 44.866 151.364 44.813 151.505C44.6718 151.859 44.5835 152.036 44.5835 152.036Z"
                            fill="#994848"></path>
                        <path
                            d="M38.5805 137.336C38.6688 138.326 38.916 139.156 39.2514 139.986L39.9047 138.997L41.2643 136.965L41.3526 136.841C41.282 136.258 41.229 135.675 41.176 135.092C40.7699 135.004 40.3638 134.986 39.9224 135.039C39.9047 135.039 39.8694 135.039 39.8694 135.057C39.8518 135.057 39.8341 135.057 39.8165 135.057C39.8165 135.057 38.4392 135.993 38.5805 137.336Z"
                            fill="#994848"></path>
                        <path d="M44.5656 152.036L44.0889 150.958C44.2478 151.329 44.4067 151.682 44.5656 152.036Z"
                              fill="#994848"></path>
                        <path d="M39.4279 140.375L39.269 139.986C39.3044 140.128 39.375 140.251 39.4279 140.375Z"
                              fill="#994848"></path>
                        <path
                            d="M45.0249 151.028C45.3074 151.788 45.5899 152.548 45.8724 153.308C46.1196 152.513 46.2432 152.053 46.2432 152.053L50.6751 148.997C50.3043 146.753 49.3685 144.509 48.3267 142.583C47.7617 144.297 47.0554 146.135 46.4021 147.742C45.8548 149.067 45.3604 150.251 45.0249 151.028Z"
                            fill="#994848"></path>
                        <path
                            d="M42.2347 135.499C41.8816 135.304 41.5284 135.163 41.1753 135.092C41.2283 135.675 41.2812 136.258 41.3519 136.841L42.2347 135.499Z"
                            fill="#994848"></path>
                        <path
                            d="M45.6255 154.085C46.0493 154.827 46.4554 155.445 46.8791 155.905C46.5436 155.039 46.2082 154.173 45.8727 153.308C45.8021 153.537 45.7138 153.802 45.6255 154.085Z"
                            fill="#994848"></path>
                        <path
                            d="M46.2434 152.036C46.2434 152.036 46.1198 152.495 45.8726 153.29C46.208 154.156 46.5435 155.021 46.879 155.887C48.3269 157.477 49.6864 156.929 50.7458 152.036C50.7635 151.983 50.7635 151.912 50.7812 151.859C50.8694 150.922 50.8165 149.951 50.6576 148.979L46.2434 152.036Z"
                            fill="#994848"></path>
                        <path
                            d="M42.2353 141.841C41.8468 140.181 41.5467 138.52 41.3524 136.841L41.2642 136.965C41.4054 137.972 41.7056 139.898 42.2353 141.841Z"
                            fill="#EFE1C5"></path>
                        <path
                            d="M49.2275 137.159C46.3318 133.237 43.648 129.668 41.1937 128.873C40.7699 128.732 40.3462 128.679 39.9224 128.714C38.5805 128.838 39.8341 130.993 41.0524 132.707C41.8823 133.856 42.6945 134.81 42.6945 134.81L42.2354 135.499L41.3526 136.841C41.5645 138.52 41.8646 140.198 42.2354 141.841C43.0476 144.863 44.3719 147.954 46.4024 147.725C47.0557 146.117 47.762 144.262 48.327 142.566C49.1569 140.022 49.7043 137.795 49.2275 137.159Z"
                            fill="#EFE1C5"></path>
                        <path
                            d="M39.9043 138.997C40.7165 141.205 42.1997 145.057 44.7952 151.523C44.8482 151.382 44.9365 151.223 45.0071 151.028C43.9124 147.99 42.9236 144.933 42.2173 141.841C41.6876 139.88 41.3875 137.954 41.2462 136.965L39.9043 138.997Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M46.4019 147.725C44.3713 147.954 43.0471 144.863 42.2349 141.841C42.9411 144.933 43.9123 147.972 45.0246 151.028C45.3601 150.251 45.8545 149.067 46.4019 147.725Z"
                            fill="#E0C4B1"></path>
                        <path
                            d="M39.4277 140.375L41.8114 145.923L44.0891 150.958C43.3475 149.279 42.6236 147.442 41.935 145.693C41.0168 143.343 40.081 141.841 39.4277 140.375Z"
                            fill="#E0C4B1"></path>
                        <path opacity="0.31"
                              d="M39.4277 140.375L41.8114 145.923L44.0891 150.958C43.3475 149.279 42.6236 147.442 41.935 145.693C41.0168 143.343 40.081 141.841 39.4277 140.375Z"
                              fill="#994848"></path>
                        <path
                            d="M39.9043 138.997L39.251 139.986C39.251 139.986 39.251 139.986 39.251 140.004L39.4099 140.393C40.0632 141.859 40.999 143.343 41.9172 145.693C42.6058 147.442 43.3297 149.297 44.0713 150.958L44.548 152.036V152.053C44.548 152.053 44.6363 151.859 44.7776 151.541C42.1997 145.057 40.7165 141.205 39.9043 138.997Z"
                            fill="#E0C4B1"></path>
                        <path opacity="0.31"
                              d="M39.9043 138.997L39.251 139.986C39.251 139.986 39.251 139.986 39.251 140.004L39.4099 140.393C40.0632 141.859 40.999 143.343 41.9172 145.693C42.6058 147.442 43.3297 149.297 44.0713 150.958L44.548 152.036V152.053C44.548 152.053 44.6363 151.859 44.7776 151.541C42.1997 145.057 40.7165 141.205 39.9043 138.997Z"
                              fill="#994848"></path>
                        <path
                            d="M57.5259 128.767C58.0909 129.085 58.4617 129.191 58.4617 129.191C67.0252 121.153 65.7186 117.354 63.282 116.559C63.1937 118.45 61.7459 121.329 57.7024 125.34L57.5259 128.767Z"
                            fill="#E56865"></path>
                        <path opacity="0.16"
                              d="M57.5259 128.767C58.0909 129.085 58.4617 129.191 58.4617 129.191C67.0252 121.153 65.7186 117.354 63.282 116.559C63.1937 118.45 61.7459 121.329 57.7024 125.34L57.5259 128.767Z"
                              fill="black"></path>
                        <path
                            d="M57.72 125.34C57.3846 125.676 57.0314 126.011 56.6606 126.365C56.6606 126.365 55.0892 125.941 53.3765 123.944C54.789 126.824 56.5017 128.167 57.5258 128.767L57.72 125.34Z"
                            fill="#E56865"></path>
                        <path opacity="0.16"
                              d="M57.72 125.34C57.3846 125.676 57.0314 126.011 56.6606 126.365C56.6606 126.365 55.0892 125.941 53.3765 123.944C54.789 126.824 56.5017 128.167 57.5258 128.767L57.72 125.34Z"
                              fill="black"></path>
                        <path
                            d="M58.4617 119.068C58.4617 119.068 59.3445 117.407 60.81 116.718C61.534 116.365 62.4698 116.312 63.282 116.577C63.4233 113.803 60.6865 113.096 58.9914 113.909C58.7442 114.033 58.5147 114.174 58.2851 114.333L58.0732 118.326C58.2145 118.538 58.3381 118.785 58.4617 119.068Z"
                            fill="#FCFCFC"></path>
                        <path
                            d="M56.6607 116.241C53.8356 110.004 48.98 114.545 50.9399 119.669C51.6638 121.577 52.5467 122.955 53.3942 123.944C53.1823 123.502 52.9704 123.008 52.7585 122.478C50.8869 117.584 55.2481 113.202 58.1085 118.308L58.3204 114.315C57.261 115.11 56.6607 116.241 56.6607 116.241Z"
                            fill="#FCFCFC"></path>
                        <path
                            d="M60.8277 116.7C59.3622 117.407 58.4794 119.05 58.4794 119.05C58.3558 118.785 58.2322 118.538 58.1086 118.308L57.7378 125.34C61.7812 121.312 63.2291 118.45 63.3173 116.559C62.4875 116.294 61.5517 116.347 60.8277 116.7Z"
                            fill="#FCFCFC"></path>
                        <path
                            d="M56.6606 126.365C57.0314 126.011 57.3845 125.676 57.72 125.34L58.0908 118.308C55.2304 113.202 50.8692 117.584 52.7408 122.478C52.935 123.008 53.1469 123.485 53.3764 123.944C55.0715 125.941 56.6606 126.365 56.6606 126.365Z"
                            fill="#FCFCFC"></path>
                        <path
                            d="M49.2627 42.002C49.4569 41.7017 49.5805 41.525 49.5805 41.525C49.5982 41.4896 49.5982 41.4543 49.5628 41.4366C49.5275 41.419 49.4922 41.419 49.4746 41.4543C49.4746 41.472 49.351 41.631 49.1567 41.9313C49.1744 41.949 49.1921 41.949 49.2097 41.9667C49.2274 41.9667 49.245 41.9843 49.2627 42.002Z"
                            fill="white"></path>
                        <path
                            d="M75.4297 46.7899C75.4651 46.7899 75.4827 46.7546 75.4827 46.7192C75.4827 46.6839 75.4474 46.6662 75.4121 46.6662C64.253 48.7687 57.7553 48.327 56.1132 45.3942C54.4358 42.4083 58.5499 37.7971 58.5852 37.7441C58.6028 37.7088 58.6028 37.6734 58.5852 37.6558C58.5499 37.6381 58.5145 37.6381 58.4969 37.6558C58.3203 37.8501 54.2769 42.3907 56.0073 45.4472C56.9961 47.2139 59.6622 48.0973 63.9705 48.0973C66.9898 48.0973 70.8213 47.6556 75.4297 46.7899Z"
                            fill="white"></path>
                        <path
                            d="M92.9806 61.772C93.0865 62.6907 92.7687 63.5564 92.0448 64.3338C92.0271 64.3691 92.0271 64.4044 92.0448 64.4221C92.0624 64.4398 92.0801 64.4398 92.0977 64.4398C92.1154 64.4398 92.1331 64.4398 92.1507 64.4221C92.91 63.5917 93.2278 62.7084 93.1218 61.7543C92.8747 59.5812 90.4027 57.8321 90.385 57.8144C90.3497 57.7968 90.3144 57.7968 90.2968 57.8321C90.2791 57.8674 90.2791 57.9028 90.3144 57.9204C90.3144 57.9558 92.7334 59.6519 92.9806 61.772Z"
                            fill="white"></path>
                        <path
                            d="M91.7443 72.9555C91.709 72.9379 91.6737 72.9379 91.6561 72.9555C91.6384 72.9909 91.6384 73.0262 91.6561 73.0439C91.6737 73.0616 93.4924 74.7753 92.9803 76.7011C92.5036 78.4678 90.2612 79.8282 86.2707 80.7646C86.2354 80.7646 86.2178 80.7999 86.2178 80.8353C86.2178 80.8706 86.2531 80.8883 86.2884 80.8883H86.3061C90.3318 79.9519 92.6272 78.5562 93.1039 76.7364C93.6336 74.7576 91.762 72.9732 91.7443 72.9555Z"
                            fill="white"></path>
                        <path
                            d="M48.4323 81.3476C49.474 84.0684 55.7246 84.9695 55.9894 85.0048C55.9894 85.0048 55.9894 85.0048 56.0071 85.0048C56.0424 85.0048 56.06 84.9871 56.0777 84.9518C56.0777 84.9165 56.06 84.8811 56.0247 84.8811C55.9541 84.8635 49.5976 83.9448 48.5736 81.3123C48.2381 80.4643 48.5029 79.4925 49.3681 78.4678C49.3858 78.4325 49.3858 78.3972 49.3681 78.3795C49.3328 78.3618 49.2975 78.3618 49.2798 78.3795C48.3617 79.4395 48.0792 80.4466 48.4323 81.3476Z"
                            fill="white"></path>
                        <path
                            d="M112.474 132.548C112.491 132.548 112.491 132.548 112.474 132.548C112.509 132.531 112.527 132.513 112.509 132.495C112.262 131.842 111.997 131.17 111.75 130.516C111.75 130.499 111.732 130.499 111.732 130.499C111.732 130.552 111.714 130.605 111.714 130.675C111.962 131.294 112.191 131.912 112.438 132.548C112.438 132.531 112.456 132.548 112.474 132.548Z"
                            fill="white"></path>
                        <path
                            d="M113.815 136.205C113.815 136.205 113.815 136.188 113.815 136.205C113.851 136.188 113.868 136.17 113.851 136.152C113.621 135.481 113.374 134.81 113.127 134.156C113.127 134.138 113.091 134.121 113.074 134.138C113.056 134.138 113.038 134.174 113.056 134.191C113.303 134.845 113.533 135.516 113.78 136.188C113.78 136.188 113.798 136.205 113.815 136.205Z"
                            fill="white"></path>
                        <path
                            d="M115.069 139.88C115.104 139.863 115.122 139.845 115.104 139.827C114.893 139.156 114.663 138.485 114.433 137.813C114.433 137.795 114.398 137.778 114.381 137.778C114.363 137.778 114.345 137.813 114.345 137.831C114.575 138.502 114.804 139.174 115.016 139.845C115.034 139.863 115.051 139.88 115.069 139.88Z"
                            fill="white"></path>
                        <path
                            d="M116.234 143.573C116.234 143.573 116.252 143.573 116.234 143.573C116.27 143.555 116.287 143.537 116.27 143.52C116.058 142.848 115.846 142.159 115.634 141.488C115.634 141.47 115.599 141.453 115.581 141.453C115.564 141.453 115.546 141.488 115.546 141.506C115.758 142.177 115.97 142.848 116.182 143.537C116.199 143.573 116.217 143.573 116.234 143.573Z"
                            fill="white"></path>
                        <path
                            d="M117.329 147.301C117.347 147.301 117.347 147.301 117.329 147.301C117.365 147.301 117.382 147.265 117.365 147.248C117.171 146.576 116.976 145.887 116.782 145.216C116.782 145.198 116.747 145.18 116.729 145.18C116.711 145.18 116.694 145.216 116.694 145.233C116.888 145.905 117.1 146.594 117.277 147.265C117.294 147.301 117.312 147.301 117.329 147.301Z"
                            fill="white"></path>
                        <path
                            d="M118.371 151.046C118.406 151.046 118.424 151.011 118.406 150.993C118.23 150.322 118.035 149.633 117.859 148.944C117.859 148.926 117.823 148.908 117.806 148.908C117.788 148.908 117.771 148.944 117.771 148.961C117.965 149.633 118.141 150.322 118.318 151.011C118.336 151.046 118.353 151.046 118.371 151.046Z"
                            fill="white"></path>
                        <path
                            d="M120.226 158.608C120.261 158.608 120.278 158.573 120.261 158.555C120.102 157.883 119.943 157.177 119.784 156.488C119.784 156.47 119.749 156.452 119.731 156.452C119.713 156.452 119.696 156.488 119.696 156.505C119.855 157.194 120.014 157.883 120.173 158.573C120.19 158.59 120.208 158.608 120.226 158.608Z"
                            fill="white"></path>
                        <path
                            d="M119.325 154.827C119.325 154.827 119.342 154.827 119.325 154.827C119.36 154.827 119.378 154.792 119.36 154.774C119.201 154.103 119.025 153.396 118.848 152.725C118.848 152.707 118.813 152.689 118.795 152.689C118.777 152.689 118.76 152.725 118.76 152.742C118.936 153.431 119.113 154.12 119.272 154.792C119.289 154.809 119.307 154.827 119.325 154.827Z"
                            fill="white"></path>
                        <path
                            d="M94.7465 100.093C94.7288 100.075 94.7112 100.075 94.6758 100.093C94.6582 100.111 94.6582 100.128 94.6758 100.164C95.1173 100.694 95.5587 101.259 96.0001 101.824C96.0001 101.842 96.0178 101.842 96.0354 101.842C96.0531 101.842 96.0531 101.842 96.0707 101.824C96.0884 101.807 96.0884 101.789 96.0707 101.754C95.6293 101.188 95.1879 100.623 94.7465 100.093Z"
                            fill="white"></path>
                        <path
                            d="M92.1864 97.1778C92.1687 97.1601 92.1334 97.1601 92.1158 97.1778C92.0981 97.1955 92.0981 97.2308 92.1158 97.2485C92.5749 97.7431 93.0516 98.2732 93.546 98.8209C93.546 98.8385 93.5637 98.8385 93.5813 98.8385C93.599 98.8385 93.599 98.8385 93.6166 98.8209C93.6343 98.8032 93.6343 98.7855 93.6166 98.7502C93.1222 98.2025 92.6455 97.6725 92.1864 97.1778Z"
                            fill="white"></path>
                        <path
                            d="M89.3612 94.4923C89.3436 94.4746 89.3082 94.4746 89.2906 94.4923C89.2729 94.51 89.2729 94.5453 89.2906 94.563C89.2906 94.563 89.8733 95.0223 90.862 95.9764C90.862 95.9764 90.8797 95.994 90.8973 95.994C90.915 95.994 90.915 95.994 90.9327 95.9764C90.9503 95.9587 90.9503 95.9234 90.9327 95.9057C89.9439 94.9517 89.3612 94.4923 89.3612 94.4923Z"
                            fill="white"></path>
                        <path
                            d="M97.1297 103.167C97.112 103.149 97.0944 103.149 97.0767 103.149C97.0591 103.167 97.0591 103.185 97.0591 103.202C97.4652 103.75 97.889 104.333 98.2951 104.916C98.2951 104.934 98.3127 104.934 98.3304 104.934H98.348C98.3657 104.916 98.3657 104.898 98.3657 104.881C97.9596 104.298 97.5535 103.715 97.1297 103.167Z"
                            fill="white"></path>
                        <path
                            d="M109.507 125.322C109.507 125.34 109.525 125.358 109.543 125.358H109.56C109.578 125.34 109.596 125.322 109.578 125.305C109.295 124.651 109.013 123.997 108.713 123.361C108.695 123.343 108.677 123.326 108.66 123.343C108.642 123.361 108.624 123.379 108.642 123.396C108.942 124.015 109.225 124.668 109.507 125.322Z"
                            fill="white"></path>
                        <path
                            d="M107.919 121.789C107.919 121.806 107.936 121.806 107.954 121.806H107.972C107.989 121.789 108.007 121.771 107.989 121.753C107.689 121.117 107.389 120.464 107.071 119.845C107.053 119.828 107.036 119.81 107.018 119.828C107 119.845 106.983 119.863 107 119.881C107.301 120.499 107.618 121.135 107.919 121.789Z"
                            fill="white"></path>
                        <path
                            d="M99.3724 106.33C99.3547 106.312 99.3371 106.312 99.3194 106.312C99.3018 106.33 99.3018 106.347 99.3018 106.365C99.6902 106.948 100.079 107.531 100.467 108.132C100.467 108.149 100.485 108.149 100.502 108.149H100.52C100.538 108.132 100.555 108.114 100.538 108.096C100.149 107.513 99.7608 106.913 99.3724 106.33Z"
                            fill="white"></path>
                        <path
                            d="M111.697 130.481C111.679 130.481 111.662 130.516 111.679 130.534C111.697 130.569 111.714 130.605 111.714 130.64C111.714 130.587 111.732 130.534 111.732 130.463C111.732 130.481 111.714 130.481 111.697 130.481Z"
                            fill="white"></path>
                        <path
                            d="M106.224 118.291C106.224 118.308 106.241 118.308 106.259 118.308H106.277C106.294 118.291 106.312 118.273 106.294 118.255C105.976 117.619 105.641 116.983 105.323 116.365C105.305 116.347 105.288 116.329 105.27 116.347C105.252 116.365 105.235 116.382 105.252 116.4C105.57 117.018 105.888 117.654 106.224 118.291Z"
                            fill="white"></path>
                        <path
                            d="M103.469 112.955C103.451 112.937 103.434 112.92 103.416 112.937C103.398 112.955 103.381 112.973 103.398 112.99C103.734 113.591 104.087 114.209 104.423 114.845C104.423 114.863 104.44 114.863 104.458 114.863H104.476C104.493 114.845 104.511 114.828 104.493 114.81C104.158 114.174 103.805 113.556 103.469 112.955Z"
                            fill="white"></path>
                        <path
                            d="M110.231 126.877C110.213 126.895 110.196 126.912 110.213 126.93C110.478 127.584 110.761 128.237 111.026 128.891C111.026 128.909 111.043 128.926 111.061 128.926H111.079C111.096 128.909 111.114 128.891 111.096 128.873C110.831 128.22 110.566 127.566 110.284 126.912C110.284 126.895 110.249 126.877 110.231 126.877Z"
                            fill="white"></path>
                        <path
                            d="M101.473 109.598C101.456 109.58 101.438 109.563 101.42 109.58C101.403 109.598 101.385 109.616 101.403 109.633C101.774 110.216 102.127 110.835 102.498 111.453C102.498 111.471 102.515 111.471 102.533 111.471H102.551C102.568 111.453 102.586 111.435 102.568 111.418C102.215 110.817 101.844 110.199 101.473 109.598Z"
                            fill="white"></path>
                        <path
                            d="M72.7463 137.742C72.764 137.689 72.7463 137.654 72.6933 137.636C72.6404 137.619 72.6051 137.636 72.5874 137.689C72.6227 137.689 72.6404 137.707 72.6757 137.707C72.6933 137.725 72.711 137.742 72.7463 137.742Z"
                            fill="white"></path>
                        <path
                            d="M72.6577 137.99C72.7107 137.831 72.746 137.742 72.746 137.742C72.7107 137.725 72.693 137.725 72.6577 137.707C72.6577 137.725 72.6577 137.813 72.6577 137.99Z"
                            fill="white"></path>
                        <path
                            d="M72.6571 137.725C72.622 137.707 72.6044 137.707 72.5693 137.707C72.5693 137.707 72.5518 137.725 72.5518 137.76C72.622 137.725 72.6571 137.725 72.6571 137.725Z"
                            fill="white"></path>
                        <path
                            d="M72.5518 137.742C72.4811 137.901 72.2869 138.467 72.0044 139.315L72.1633 139.403C72.3752 138.75 72.5518 138.272 72.6401 138.007C72.6401 137.831 72.6577 137.725 72.6577 137.725C72.6577 137.725 72.6224 137.725 72.5518 137.742Z"
                            fill="white"></path>
                        <path
                            d="M68.597 156.611C68.544 156.594 68.5087 156.629 68.491 156.682C68.4734 156.77 68.4381 156.859 68.4204 156.965C68.4557 157.053 68.491 157.141 68.5264 157.23C68.5793 157.071 68.6146 156.894 68.6676 156.735C68.6676 156.664 68.6323 156.629 68.597 156.611Z"
                            fill="white"></path>
                        <path
                            d="M68.8791 154.951C68.8614 155.004 68.8968 155.039 68.9497 155.057H68.9674C69.0027 155.057 69.038 155.021 69.0557 154.986C69.1793 154.403 69.3029 153.785 69.4265 153.078C69.3735 153.025 69.3205 152.972 69.2676 152.919C69.144 153.679 69.0027 154.35 68.8791 154.951Z"
                            fill="white"></path>
                        <path
                            d="M71.8983 139.704C71.8806 139.757 71.9159 139.792 71.9512 139.81H71.9689C72.0042 139.81 72.0395 139.792 72.0572 139.739C72.0925 139.615 72.1278 139.492 72.1631 139.386L72.0042 139.297C71.9689 139.421 71.9336 139.562 71.8983 139.704Z"
                            fill="white"></path>
                        <path
                            d="M69.6385 151.24C69.6562 151.24 69.6562 151.24 69.6385 151.24C69.6915 151.24 69.7268 151.205 69.7444 151.17C69.8504 150.481 69.9563 149.792 70.0623 149.103V149.085C70.0623 149.032 70.0446 148.997 69.9916 148.979C69.9387 148.979 69.9033 148.997 69.8857 149.05V149.067C69.7797 149.756 69.6738 150.445 69.5679 151.134C69.5679 151.187 69.6032 151.223 69.6385 151.24Z"
                            fill="white"></path>
                        <path
                            d="M70.2386 147.389C70.2563 147.389 70.2563 147.389 70.2386 147.389C70.2916 147.389 70.3269 147.354 70.3445 147.318C70.3975 146.965 70.4505 146.629 70.5034 146.294C70.5564 145.94 70.627 145.569 70.6977 145.234C70.7153 145.181 70.68 145.145 70.627 145.128C70.5741 145.11 70.5388 145.145 70.5211 145.198C70.4505 145.552 70.3975 145.905 70.3269 146.258C70.2739 146.594 70.2209 146.947 70.168 147.283C70.168 147.336 70.2033 147.389 70.2386 147.389Z"
                            fill="white"></path>
                        <path
                            d="M70.9624 143.573H70.9801C71.0154 143.573 71.0507 143.537 71.0684 143.502C71.2273 142.813 71.4038 142.124 71.5804 141.453C71.5981 141.4 71.5628 141.364 71.5098 141.347C71.4568 141.329 71.4215 141.364 71.4038 141.417C71.2273 142.089 71.0507 142.795 70.8918 143.484C70.8741 143.502 70.9095 143.555 70.9624 143.573Z"
                            fill="white"></path>
                        <path
                            d="M69.3735 152.795C69.3205 152.778 69.2852 152.813 69.2676 152.866C69.2676 152.884 69.2676 152.901 69.2676 152.919C69.3205 152.972 69.3735 153.025 69.4265 153.078C69.4441 153.025 69.4441 152.954 69.4618 152.901C69.4618 152.848 69.4265 152.813 69.3735 152.795Z"
                            fill="white"></path>
                        <path
                            d="M65.5245 161.417C65.5068 161.435 65.5068 161.452 65.5068 161.47C65.5068 161.523 65.5421 161.541 65.5951 161.541C65.5951 161.541 65.5951 161.541 65.6128 161.541C65.6481 161.541 65.6834 161.523 65.7364 161.523C65.7011 161.505 65.6481 161.488 65.6128 161.452C65.5775 161.452 65.5598 161.435 65.5245 161.417Z"
                            fill="white"></path>
                        <path
                            d="M67.8548 158.696C67.8371 158.749 67.8548 158.785 67.9077 158.802C67.9254 158.802 67.9254 158.802 67.943 158.802C67.9784 158.802 68.0137 158.785 68.0313 158.749C68.2079 158.29 68.3668 157.795 68.5257 157.212C68.4904 157.124 68.4551 157.035 68.4198 156.947C68.2256 157.601 68.049 158.184 67.8548 158.696Z"
                            fill="white"></path>
                        <path
                            d="M67.237 160.357C67.2724 160.322 67.2547 160.269 67.2194 160.233C67.1841 160.198 67.1311 160.216 67.0958 160.251C66.6367 160.922 66.16 161.293 65.6126 161.364C65.5773 161.364 65.5596 161.382 65.542 161.399C65.5596 161.417 65.595 161.435 65.6126 161.435C65.6479 161.452 65.7009 161.47 65.7362 161.505C66.2836 161.399 66.778 161.011 67.237 160.357Z"
                            fill="white"></path>
                        <path
                            d="M87.1187 115.517C87.1187 115.534 87.1187 115.534 87.1363 115.552C87.1363 115.552 87.1363 115.552 87.154 115.552C87.154 115.552 87.1716 115.552 87.1716 115.534L88.0015 113.838C88.0015 113.821 87.9838 113.803 87.9838 113.785L87.1187 115.517Z"
                            fill="white"></path>
                        <path
                            d="M87.9482 117.725L87.9836 117.743L88.9194 115.835C88.9194 115.817 88.9017 115.799 88.9017 115.782L87.9482 117.725Z"
                            fill="white"></path>
                        <path
                            d="M96.2651 141.806L96.3005 141.824L100.044 134.138C100.026 134.121 100.026 134.103 100.008 134.103L96.2651 141.806Z"
                            fill="white"></path>
                        <path d="M120.596 144.156L120.631 144.173L123.156 138.997L123.121 138.979L120.596 144.156Z"
                              fill="white"></path>
                        <path
                            d="M82.8457 170.498L82.881 170.516L85.918 164.297C85.9003 164.279 85.9003 164.279 85.8827 164.261L82.8457 170.498Z"
                            fill="white"></path>
                        <path
                            d="M21.506 154.739L21.4707 154.756L23.0951 159.085C23.1128 159.067 23.1128 159.05 23.1304 159.032L21.506 154.739Z"
                            fill="white"></path>
                        <path
                            d="M22.8654 154.403L22.8301 154.421L24.0307 157.636C24.0484 157.618 24.0484 157.601 24.0661 157.583L22.8654 154.403Z"
                            fill="white"></path>
                        <path
                            d="M86.165 168.502L86.2004 168.519L87.4716 165.905C87.454 165.887 87.454 165.887 87.4363 165.869L86.165 168.502Z"
                            fill="white"></path>
                        <path
                            d="M109.048 188.183C108.377 187.936 107.724 187.671 107.071 187.424C107.035 187.406 107 187.424 106.983 187.459C106.965 187.494 106.983 187.53 107.018 187.547C107.671 187.812 108.342 188.06 108.995 188.307H109.013C109.048 188.307 109.066 188.289 109.084 188.272C109.101 188.236 109.084 188.183 109.048 188.183Z"
                            fill="white"></path>
                        <path
                            d="M110.62 188.819C110.602 188.855 110.62 188.89 110.655 188.908C111.326 189.137 111.997 189.367 112.668 189.597H112.686C112.721 189.597 112.739 189.579 112.756 189.544C112.739 189.508 112.703 189.491 112.686 189.455C112.032 189.243 111.361 189.014 110.708 188.784C110.673 188.766 110.637 188.784 110.62 188.819Z"
                            fill="white"></path>
                        <path
                            d="M101.827 185.304C101.844 185.304 101.844 185.304 101.862 185.304C101.88 185.304 101.915 185.286 101.915 185.268C101.933 185.233 101.915 185.198 101.88 185.18C101.615 185.056 101.368 184.933 101.103 184.809C101.05 184.827 100.997 184.862 100.944 184.88C101.244 185.021 101.527 185.162 101.827 185.304Z"
                            fill="white"></path>
                        <path
                            d="M105.429 186.752C104.775 186.487 104.122 186.205 103.486 185.922C103.451 185.904 103.416 185.922 103.398 185.957C103.38 185.993 103.398 186.028 103.433 186.046C104.087 186.328 104.74 186.611 105.376 186.894H105.393C105.411 186.894 105.446 186.876 105.446 186.858C105.482 186.805 105.464 186.77 105.429 186.752Z"
                            fill="white"></path>
                        <path
                            d="M99.8849 184.296C99.8672 184.332 99.8849 184.367 99.9202 184.385C100.256 184.562 100.609 184.721 100.962 184.897C101.015 184.88 101.068 184.844 101.121 184.827C100.732 184.65 100.362 184.456 99.9908 184.279C99.9378 184.243 99.9025 184.261 99.8849 184.296Z"
                            fill="white"></path>
                        <path
                            d="M98.3305 183.59C98.3481 183.59 98.3481 183.59 98.3658 183.59C98.3834 183.59 98.4188 183.572 98.4188 183.554C98.4364 183.519 98.4188 183.484 98.3834 183.466C98.2245 183.378 98.0656 183.307 97.9067 183.219C97.8714 183.254 97.8361 183.289 97.8008 183.307C97.9773 183.395 98.1539 183.484 98.3305 183.59Z"
                            fill="white"></path>
                        <path
                            d="M70.8916 159.156C70.8562 159.173 70.8562 159.209 70.8739 159.244C71.0681 159.544 71.2447 159.845 71.4389 160.127H71.5978C71.3859 159.809 71.1741 159.491 70.9798 159.173C70.9622 159.156 70.9269 159.138 70.8916 159.156Z"
                            fill="white"></path>
                        <path
                            d="M69.9563 157.742C69.974 157.76 69.9916 157.777 70.0093 157.777C70.0269 157.777 70.0269 157.777 70.0446 157.76C70.0799 157.742 70.0799 157.707 70.0622 157.671L69.9563 157.495C69.9386 157.548 69.921 157.601 69.9033 157.654L69.9563 157.742Z"
                            fill="white"></path>
                        <path
                            d="M83.729 173.714C83.6937 173.696 83.6583 173.696 83.6407 173.714C83.623 173.731 83.623 173.784 83.6407 173.802C84.1704 174.261 84.7177 174.703 85.2828 175.145C85.3004 175.162 85.3181 175.162 85.3181 175.162C85.3357 175.162 85.3534 175.162 85.371 175.145C85.3887 175.109 85.3887 175.074 85.3534 175.056C84.806 174.615 84.2587 174.173 83.729 173.714Z"
                            fill="white"></path>
                        <path
                            d="M80.833 171.116C80.8153 171.099 80.7623 171.099 80.7447 171.116C80.727 171.152 80.727 171.187 80.7447 171.205C81.2567 171.682 81.7864 172.177 82.2985 172.636C82.3161 172.654 82.3338 172.654 82.3338 172.654C82.3514 172.654 82.3691 172.654 82.3868 172.636C82.4044 172.601 82.4044 172.565 82.3868 172.548C81.8571 172.088 81.345 171.611 80.833 171.116Z"
                            fill="white"></path>
                        <path
                            d="M75.5357 165.463C75.518 165.428 75.465 165.428 75.4474 165.463C75.4121 165.481 75.4121 165.534 75.4474 165.551C75.8888 166.099 76.3655 166.629 76.8246 167.159C76.8423 167.177 76.8599 167.177 76.8776 167.177C76.8952 167.177 76.9129 167.177 76.9129 167.159C76.9482 167.141 76.9482 167.088 76.9129 167.071C76.4362 166.541 75.9771 165.993 75.5357 165.463Z"
                            fill="white"></path>
                        <path
                            d="M78.0962 168.378C78.0786 168.343 78.0256 168.343 78.0079 168.378C77.9726 168.396 77.9726 168.449 78.0079 168.466C78.4847 168.979 78.9791 169.491 79.4911 169.986C79.5088 170.003 79.5264 170.003 79.5441 170.003C79.5617 170.003 79.5794 170.003 79.597 169.986C79.6147 169.968 79.6147 169.915 79.597 169.897C79.0673 169.403 78.5729 168.89 78.0962 168.378Z"
                            fill="white"></path>
                        <path
                            d="M94.9937 181.593C94.3757 181.24 93.7754 180.869 93.1751 180.516C93.1398 180.498 93.1045 180.498 93.0868 180.533C93.0691 180.569 93.0691 180.604 93.1044 180.622C93.7048 180.993 94.3228 181.346 94.9231 181.699C94.9407 181.699 94.9407 181.699 94.9584 181.699C94.9761 181.699 95.0114 181.682 95.0114 181.664C95.029 181.664 95.0114 181.611 94.9937 181.593Z"
                            fill="white"></path>
                        <path
                            d="M96.4414 182.494C96.4237 182.53 96.4414 182.565 96.459 182.583C96.9005 182.83 97.3596 183.077 97.801 183.307C97.8363 183.272 97.8716 183.236 97.9069 183.219C97.4478 182.971 96.9711 182.724 96.512 182.477C96.4944 182.441 96.4591 182.459 96.4414 182.494Z"
                            fill="white"></path>
                        <path
                            d="M74.3705 164.191C74.3882 164.191 74.4058 164.191 74.4058 164.173C74.4412 164.155 74.4412 164.102 74.4235 164.085C73.9821 163.537 73.5583 162.954 73.1522 162.389C73.1345 162.353 73.0816 162.353 73.0639 162.371C73.0286 162.389 73.0286 162.442 73.0463 162.459C73.4524 163.025 73.8938 163.59 74.3176 164.155C74.3352 164.173 74.3529 164.191 74.3705 164.191Z"
                            fill="white"></path>
                        <path
                            d="M72.0398 161.028C72.0574 161.046 72.0751 161.064 72.0927 161.064C72.1104 161.064 72.1104 161.064 72.1281 161.046C72.1634 161.028 72.1634 160.993 72.1457 160.958C71.9692 160.693 71.7749 160.428 71.5984 160.145H71.4395C71.6337 160.445 71.8279 160.728 72.0398 161.028Z"
                            fill="white"></path>
                        <path
                            d="M91.6737 179.579C91.0733 179.191 90.4907 178.802 89.908 178.413C89.8727 178.396 89.8374 178.396 89.8197 178.431C89.802 178.466 89.802 178.502 89.8374 178.519C90.42 178.908 91.0027 179.297 91.603 179.685C91.6207 179.685 91.6207 179.703 91.6384 179.703C91.656 179.703 91.6737 179.685 91.6913 179.668C91.709 179.632 91.6913 179.597 91.6737 179.579Z"
                            fill="white"></path>
                        <path
                            d="M86.7483 176.152C86.713 176.134 86.6777 176.134 86.66 176.169C86.6424 176.205 86.6424 176.24 86.6777 176.258C87.2427 176.682 87.8077 177.106 88.3904 177.512C88.4081 177.512 88.408 177.53 88.4257 177.53C88.4434 177.53 88.461 177.512 88.4787 177.494C88.4963 177.459 88.4963 177.424 88.461 177.406C87.8784 176.982 87.3133 176.576 86.7483 176.152Z"
                            fill="white"></path>
                        <path
                            d="M125.698 192.936C127.04 193.183 127.8 193.272 127.817 193.272C127.852 193.272 127.87 193.254 127.888 193.219C127.888 193.183 127.87 193.148 127.835 193.148C127.835 193.148 127.058 193.06 125.734 192.812C125.698 192.812 125.663 192.83 125.663 192.865C125.628 192.901 125.663 192.936 125.698 192.936Z"
                            fill="white"></path>
                        <path
                            d="M120.172 191.628C119.483 191.452 118.795 191.275 118.124 191.098C118.088 191.081 118.053 191.116 118.035 191.151C118.018 191.187 118.053 191.222 118.088 191.24C118.777 191.416 119.466 191.611 120.137 191.77H120.154C120.19 191.77 120.207 191.752 120.225 191.717C120.243 191.664 120.207 191.628 120.172 191.628Z"
                            fill="white"></path>
                        <path
                            d="M121.814 192.088C121.814 192.123 121.832 192.159 121.867 192.159C122.556 192.318 123.262 192.477 123.95 192.6C123.95 192.6 123.95 192.6 123.968 192.6C124.003 192.6 124.021 192.583 124.039 192.547C124.039 192.512 124.021 192.477 123.986 192.477C123.297 192.335 122.609 192.194 121.902 192.035C121.867 192.017 121.832 192.053 121.814 192.088Z"
                            fill="white"></path>
                        <path
                            d="M112.703 189.473C112.686 189.473 112.686 189.473 112.668 189.455C112.686 189.491 112.721 189.508 112.738 189.543C112.756 189.508 112.738 189.473 112.703 189.473Z"
                            fill="white"></path>
                        <path
                            d="M116.429 190.622C115.74 190.427 115.069 190.215 114.398 190.021C114.363 190.003 114.328 190.021 114.31 190.056C114.292 190.091 114.31 190.127 114.345 190.144C115.016 190.356 115.705 190.551 116.376 190.763H116.394C116.429 190.763 116.447 190.745 116.464 190.71C116.482 190.657 116.464 190.622 116.429 190.622Z"
                            fill="white"></path>
                        <path
                            d="M69.8676 157.459C69.8323 157.477 69.8323 157.513 69.85 157.548L69.9206 157.654C69.9383 157.601 69.9559 157.548 69.9736 157.495V157.477C69.9383 157.459 69.8853 157.442 69.8676 157.459Z"
                            fill="white"></path>
                        <path
                            d="M86.3772 93.1496C86.3772 93.1319 86.3595 93.1319 86.3418 93.1142L84.4702 92.1072C84.4349 92.0895 84.3996 92.1072 84.3819 92.1425C84.3643 92.1779 84.3819 92.2132 84.4172 92.2309L86.2182 93.1849C86.2889 93.1672 86.3242 93.1672 86.3242 93.1672C86.3418 93.1849 86.3595 93.1672 86.3772 93.1496Z"
                            fill="white"></path>
                        <path
                            d="M80.9742 90.3228C80.9566 90.3581 80.9742 90.3934 81.0095 90.4111L82.8811 91.4181C82.8988 91.4181 82.8988 91.4181 82.9165 91.4181C82.9341 91.4181 82.9694 91.4005 82.9694 91.3828C82.9871 91.3475 82.9694 91.3121 82.9341 91.2945L81.0625 90.2874C81.0272 90.2874 80.9919 90.2874 80.9742 90.3228Z"
                            fill="white"></path>
                        <path
                            d="M86.3231 93.1849C86.3231 93.1849 86.288 93.1849 86.2178 93.2025L86.2529 93.22C86.2704 93.2025 86.3056 93.2025 86.3231 93.1849Z"
                            fill="white"></path>
                        <path
                            d="M86.3242 93.1848L86.3593 93.2375C86.3769 93.2375 86.3769 93.2199 86.3769 93.2199C86.3944 93.2023 86.3944 93.1848 86.3769 93.1672C86.3593 93.1672 86.3418 93.1848 86.3242 93.1848Z"
                            fill="white"></path>
                        <path
                            d="M86.3241 93.1849C86.3066 93.2025 86.2715 93.2025 86.2539 93.22L86.289 93.2376C86.3066 93.2376 86.3066 93.2376 86.3241 93.2376C86.3417 93.2376 86.3417 93.2376 86.3592 93.2376L86.3241 93.1849Z"
                            fill="white"></path>
                        <path
                            d="M85.6179 53.4329C85.6356 53.3622 85.6179 53.2916 85.6179 53.2386C85.6179 53.2209 85.5826 53.2032 85.5296 53.2032C85.512 53.2739 85.4766 53.3269 85.459 53.3976C85.512 53.4152 85.5649 53.4329 85.6179 53.4329Z"
                            fill="#3737D1"></path>
                        <path
                            d="M81.2924 57.5495C80.798 57.5848 80.2506 56.9134 79.9681 56.4187C79.9152 56.3304 79.8799 56.2244 79.8445 56.1361C79.8092 56.3834 79.8445 56.6484 80.0035 56.9134C80.286 57.4081 80.8333 58.0795 81.3277 58.0442C83.0051 57.9028 85.4771 54.5813 85.6183 53.4506C85.5653 53.4329 85.5124 53.4329 85.4594 53.4152C84.8944 54.7756 82.7756 57.4258 81.2924 57.5495Z"
                            fill="#3737D1"></path>
                        <path
                            d="M85.5293 53.2032C85.5822 53.0266 85.5999 52.8675 85.5822 52.7615C85.5646 52.6379 84.77 52.7615 83.7812 53.0442C84.152 53.1149 84.5052 53.1856 84.876 53.2739C85.1585 53.2209 85.4057 53.1856 85.5293 53.2032Z"
                            fill="#648EE5"></path>
                        <path
                            d="M79.8445 56.1361C80.1094 54.6873 83.3582 53.5742 84.8591 53.2739C84.5059 53.2032 84.1351 53.1149 83.7643 53.0442C81.9457 53.5919 79.4384 54.7403 79.8445 56.1361Z"
                            fill="#648EE5"></path>
                        <path
                            d="M84.8584 53.2739C85.0526 53.3092 85.2468 53.3623 85.4587 53.3976C85.494 53.3269 85.5117 53.2562 85.5293 53.2032C85.4058 53.1856 85.1586 53.2209 84.8584 53.2739Z"
                            fill="#3737D1"></path>
                        <path
                            d="M81.2917 57.5495C82.7749 57.4258 84.8937 54.7933 85.441 53.4152C85.2468 53.3622 85.0526 53.3269 84.8407 53.2916C83.3399 53.5743 80.091 54.705 79.8262 56.1537C79.8615 56.2421 79.8968 56.3481 79.9498 56.4364C80.2676 56.8958 80.7973 57.5848 81.2917 57.5495ZM83.7813 54.1043C83.8696 54.4753 82.7042 56.0831 81.945 56.1537C81.7331 56.1714 81.5036 55.871 81.38 55.6767C80.7973 54.705 83.746 53.9629 83.7813 54.1043Z"
                            fill="#3737D1"></path>
                        <path opacity="0.8"
                              d="M85.5822 52.7615C85.5645 52.6379 84.77 52.7615 83.7812 53.0442C81.9449 53.5919 79.4376 54.7403 79.8614 56.1184C79.8967 56.2067 79.932 56.3127 79.985 56.4011C80.2675 56.8958 80.8148 57.5671 81.3092 57.5318C82.7924 57.4081 84.9112 54.7756 85.4586 53.3976C85.4939 53.3269 85.5116 53.2562 85.5292 53.2032C85.5822 53.0266 85.5998 52.8675 85.5822 52.7615ZM81.9449 56.1537C81.733 56.1714 81.5035 55.871 81.3799 55.6767C80.8148 54.705 83.7459 53.9629 83.7812 54.1043C83.8518 54.493 82.7041 56.1007 81.9449 56.1537Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M81.9449 56.1537C82.7042 56.083 83.8519 54.4753 83.7813 54.1043C83.7459 53.9453 80.8149 54.705 81.3799 55.6767C81.5035 55.8887 81.7331 56.1714 81.9449 56.1537Z"
                            fill="#4F72B2"></path>
                        <path
                            d="M69.3383 107.655L65.3302 110.623C65.2948 110.729 65.3125 110.852 65.3831 110.941C65.4538 111.029 65.5597 111.082 65.6656 111.082C65.7363 111.082 65.8069 111.064 65.8775 111.011L69.9033 108.026C70.0622 107.902 70.0975 107.69 69.9739 107.531C69.8503 107.372 69.6384 107.337 69.4795 107.46L69.4618 107.478C69.4442 107.549 69.4089 107.602 69.3383 107.655Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M69.3383 107.655L65.3302 110.623C65.2948 110.729 65.3125 110.852 65.3831 110.941C65.4538 111.029 65.5597 111.082 65.6656 111.082C65.7363 111.082 65.8069 111.064 65.8775 111.011L69.9033 108.026C70.0622 107.902 70.0975 107.69 69.9739 107.531C69.8503 107.372 69.6384 107.337 69.4795 107.46L69.4618 107.478C69.4442 107.549 69.4089 107.602 69.3383 107.655Z"
                              fill="black"></path>
                        <path
                            d="M65.3128 110.64C65.3481 110.552 65.3834 110.499 65.454 110.446L69.4621 107.478C69.4974 107.372 69.4798 107.248 69.4092 107.16C69.2856 107.001 69.0737 106.966 68.9148 107.089L64.9067 110.075C64.7478 110.199 64.7124 110.411 64.836 110.57C64.9067 110.658 65.0126 110.711 65.1185 110.711C65.1892 110.711 65.2598 110.676 65.3128 110.64Z"
                            fill="white"></path>
                        <path
                            d="M65.3301 110.623L69.3382 107.655C69.4088 107.602 69.4441 107.549 69.4618 107.478L65.4537 110.446C65.4007 110.499 65.3654 110.552 65.3301 110.623Z"
                            fill="white"></path>
                        <path
                            d="M71.8104 116.789C71.7574 116.824 71.7044 116.842 71.6515 116.842L67.5728 117.23L67.6434 117.902L72.6226 117.425L72.552 116.718L71.8104 116.789Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M71.8104 116.789C71.7574 116.824 71.7044 116.842 71.6515 116.842L67.5728 117.23L67.6434 117.902L72.6226 117.425L72.552 116.718L71.8104 116.789Z"
                              fill="black"></path>
                        <path
                            d="M71.8103 116.789C71.9162 116.718 71.9869 116.594 71.9692 116.453C71.9516 116.259 71.775 116.117 71.5808 116.135L66.6015 116.612C66.4073 116.63 66.2661 116.806 66.2837 117.001C66.3014 117.177 66.4603 117.319 66.6369 117.319C66.6545 117.319 66.6545 117.319 66.6722 117.319L67.5903 117.23V117.195L71.8103 116.789Z"
                            fill="white"></path>
                        <path
                            d="M71.8104 116.789L67.5728 117.195V117.23L71.6515 116.842C71.7221 116.842 71.7751 116.806 71.8104 116.789Z"
                            fill="white"></path>
                        <path
                            d="M42.5534 116.877C42.5004 116.93 42.4651 116.983 42.4474 117.071C42.4121 117.266 42.5357 117.442 42.7123 117.495L43.9836 117.76C44.0542 117.584 44.1248 117.407 44.2131 117.23L42.5534 116.877Z"
                            fill="#D68080"></path>
                        <path opacity="0.1"
                              d="M42.5534 116.877C42.5004 116.93 42.4651 116.983 42.4474 117.071C42.4121 117.266 42.5357 117.442 42.7123 117.495L43.9836 117.76C44.0542 117.584 44.1248 117.407 44.2131 117.23L42.5534 116.877Z"
                              fill="black"></path>
                        <path
                            d="M47.6908 118.52C47.8497 118.52 48.0086 118.414 48.0439 118.238C48.0792 118.043 47.9556 117.866 47.779 117.813L47.3729 117.725C47.3023 117.778 47.2317 117.813 47.1434 117.813C47.1257 117.813 47.0904 117.813 47.0728 117.813L44.23 117.213C44.1594 117.389 44.0711 117.566 44.0005 117.743L47.6378 118.503C47.6378 118.52 47.6554 118.52 47.6908 118.52Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M47.6908 118.52C47.8497 118.52 48.0086 118.414 48.0439 118.238C48.0792 118.043 47.9556 117.866 47.779 117.813L47.3729 117.725C47.3023 117.778 47.2317 117.813 47.1434 117.813C47.1257 117.813 47.0904 117.813 47.0728 117.813L44.23 117.213C44.1594 117.389 44.0711 117.566 44.0005 117.743L47.6378 118.503C47.6378 118.52 47.6554 118.52 47.6908 118.52Z"
                              fill="black"></path>
                        <path
                            d="M42.8531 116.789L44.2657 117.089C44.3363 116.912 44.4246 116.736 44.4952 116.559L42.3058 116.1C42.1116 116.064 41.935 116.188 41.882 116.365C41.8467 116.559 41.9703 116.736 42.1469 116.789L42.553 116.877C42.6236 116.806 42.7472 116.771 42.8531 116.789Z"
                            fill="white"></path>
                        <path
                            d="M47.3556 117.743C47.4085 117.69 47.4438 117.637 47.4615 117.548C47.4968 117.354 47.3732 117.177 47.1967 117.124L44.4952 116.559C44.4245 116.736 44.3363 116.912 44.2656 117.089L47.3556 117.743Z"
                            fill="white"></path>
                        <path
                            d="M44.2654 117.089L42.8529 116.789C42.747 116.771 42.6234 116.806 42.5527 116.877L44.2125 117.23C44.2301 117.177 44.2478 117.124 44.2654 117.089Z"
                            fill="white"></path>
                        <path
                            d="M44.1948 117.213L47.0376 117.813C47.0552 117.813 47.0905 117.813 47.1082 117.813C47.1965 117.813 47.2848 117.778 47.3377 117.725L44.2478 117.071C44.2478 117.124 44.2301 117.177 44.1948 117.213Z"
                            fill="white"></path>
                        <path
                            d="M58.6911 109.916C58.9029 109.916 59.0442 109.775 59.0619 109.58L59.1855 106.93C59.2031 106.736 59.0442 106.577 58.85 106.559C58.8147 106.559 58.7617 106.559 58.7264 106.577L58.5498 109.881C58.5851 109.898 58.6381 109.898 58.6911 109.916Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M58.6911 109.916C58.9029 109.916 59.0442 109.775 59.0619 109.58L59.1855 106.93C59.2031 106.736 59.0442 106.577 58.85 106.559C58.8147 106.559 58.7617 106.559 58.7264 106.577L58.5498 109.881C58.5851 109.898 58.6381 109.898 58.6911 109.916Z"
                              fill="black"></path>
                        <path
                            d="M58.5325 108.909C58.5325 109.033 58.4619 109.121 58.3736 109.192L58.356 109.545C58.356 109.686 58.4266 109.81 58.5502 109.881L58.7268 106.577C58.6914 106.595 58.6561 106.595 58.6385 106.612L58.5325 108.909Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M58.5325 108.909C58.5325 109.033 58.4619 109.121 58.3736 109.192L58.356 109.545C58.356 109.686 58.4266 109.81 58.5502 109.881L58.7268 106.577C58.6914 106.595 58.6561 106.595 58.6385 106.612L58.5325 108.909Z"
                              fill="black"></path>
                        <path
                            d="M58.6383 106.612L58.6559 106.259C58.6736 106.065 58.5147 105.906 58.3204 105.888C58.1262 105.87 57.9673 106.029 57.9497 106.224L57.826 108.874C57.8084 109.068 57.9673 109.227 58.1615 109.245H58.1792C58.2498 109.245 58.3204 109.227 58.3734 109.192L58.4794 106.895C58.4794 106.771 58.5323 106.665 58.6383 106.612Z"
                            fill="white"></path>
                        <path
                            d="M58.532 108.909L58.6379 106.612C58.5496 106.665 58.479 106.771 58.479 106.895L58.373 109.192C58.4613 109.121 58.5143 109.015 58.532 108.909Z"
                            fill="white"></path>
                        <path
                            d="M50.8688 111.488C50.7982 111.541 50.7275 111.559 50.6569 111.559C50.551 111.559 50.445 111.506 50.3744 111.418L48.4321 108.909C48.3792 109.015 48.3968 109.156 48.4851 109.262L50.7982 112.248C50.8688 112.337 50.9747 112.39 51.0807 112.39C51.1513 112.39 51.2396 112.372 51.2925 112.319C51.4515 112.195 51.4691 111.983 51.3632 111.824L50.9924 111.347C50.9571 111.4 50.9218 111.453 50.8688 111.488Z"
                            fill="#E56865"></path>
                        <path opacity="0.1"
                              d="M50.8688 111.488C50.7982 111.541 50.7275 111.559 50.6569 111.559C50.551 111.559 50.445 111.506 50.3744 111.418L48.4321 108.909C48.3792 109.015 48.3968 109.156 48.4851 109.262L50.7982 112.248C50.8688 112.337 50.9747 112.39 51.0807 112.39C51.1513 112.39 51.2396 112.372 51.2925 112.319C51.4515 112.195 51.4691 111.983 51.3632 111.824L50.9924 111.347C50.9571 111.4 50.9218 111.453 50.8688 111.488Z"
                              fill="black"></path>
                        <path
                            d="M48.1147 107.955C47.9734 108.061 47.9381 108.273 48.044 108.432C48.1147 108.255 48.1853 108.079 48.2383 107.902C48.2029 107.902 48.15 107.92 48.1147 107.955Z"
                            fill="white"></path>
                        <path
                            d="M48.4148 108.927C48.4325 108.874 48.4678 108.821 48.5208 108.785C48.6797 108.662 48.8916 108.697 49.0151 108.856L50.9574 111.365C51.0104 111.259 50.9927 111.117 50.9044 111.011L48.5914 108.026C48.5031 107.902 48.3618 107.867 48.2206 107.902C48.15 108.079 48.0793 108.255 48.0264 108.432C48.0264 108.432 48.0264 108.45 48.044 108.45L48.4148 108.927Z"
                            fill="white"></path>
                        <path
                            d="M49.033 108.838C48.9094 108.679 48.6975 108.662 48.5386 108.768C48.4856 108.803 48.4503 108.856 48.4326 108.909L50.3749 111.418C50.4455 111.506 50.5514 111.559 50.6574 111.559C50.728 111.559 50.8163 111.541 50.8693 111.488C50.9222 111.453 50.9575 111.4 50.9752 111.347L49.033 108.838Z"
                            fill="white"></path>
                        <path
                            d="M58.6909 88.5912C58.6733 88.5912 58.6558 88.6264 58.6558 88.6439V88.6615C58.7084 88.6264 58.7435 88.6088 58.7962 88.5736L58.6909 88.5912Z"
                            fill="white"></path>
                        <path
                            d="M63.8108 87.6194C63.8108 87.6019 63.7757 87.5843 63.7582 87.5843L63.6528 87.6019C63.7055 87.6194 63.7582 87.6194 63.8108 87.6194C63.8108 87.637 63.8108 87.6194 63.8108 87.6194Z"
                            fill="white"></path>
                        <path
                            d="M63.8119 87.6373C63.7589 87.6196 63.7059 87.6196 63.6706 87.6019L63.1056 87.7079C63.0526 87.7433 62.9997 87.7786 62.9644 87.8316L63.7942 87.6726C63.7942 87.6726 63.8119 87.6549 63.8119 87.6373Z"
                            fill="white"></path>
                        <path
                            d="M58.7091 88.6797L59.7509 88.4677C59.6273 88.4677 59.486 88.4676 59.3624 88.45L58.8151 88.556C58.7621 88.5913 58.7268 88.609 58.6738 88.6443C58.6738 88.662 58.6915 88.6797 58.7091 88.6797Z"
                            fill="white"></path>
                        <path
                            d="M59.998 88.3793C59.998 88.3617 59.9627 88.344 59.9451 88.344L59.3447 88.4677C59.4683 88.4677 59.6096 88.4853 59.7332 88.4853L59.9451 88.45C59.9804 88.4147 59.998 88.397 59.998 88.3793Z"
                            fill="white"></path>
                        <path
                            d="M61.6754 87.9906C61.6578 87.9906 61.6401 88.026 61.6401 88.0436C61.6401 88.0613 61.6578 88.079 61.6754 88.079L62.9114 87.8316C62.9644 87.7963 63.0174 87.7433 63.0527 87.708L61.6754 87.9906Z"
                            fill="white"></path>
                        <path
                            d="M37.7326 135.887C37.6972 135.87 37.6619 135.87 37.6443 135.905C37.6443 135.905 37.609 135.94 37.5913 136.011C37.6443 135.976 37.6972 135.94 37.7679 135.923C37.7326 135.905 37.7326 135.887 37.7326 135.887Z"
                            fill="white"></path>
                        <path
                            d="M41.1752 149.085C41.1928 149.103 41.2105 149.12 41.2281 149.12C41.2458 149.12 41.2458 149.12 41.2635 149.12C41.2988 149.103 41.3164 149.067 41.2988 149.032C41.0163 148.414 40.7338 147.742 40.4689 147.089C40.4512 147.053 40.4159 147.036 40.3806 147.053C40.3453 147.071 40.3276 147.106 40.3453 147.142C40.6102 147.795 40.8927 148.449 41.1752 149.085Z"
                            fill="white"></path>
                        <path
                            d="M39.6928 145.481C39.7104 145.516 39.7281 145.516 39.7634 145.516H39.7811C39.8164 145.499 39.834 145.463 39.8164 145.428C39.5692 144.774 39.322 144.103 39.0924 143.431C39.0748 143.396 39.0395 143.378 39.0042 143.396C38.9688 143.414 38.9512 143.449 38.9688 143.484C39.1984 144.138 39.4456 144.81 39.6928 145.481Z"
                            fill="white"></path>
                        <path
                            d="M42.9589 152.601C42.9766 152.601 42.9766 152.601 42.9942 152.601C43.0295 152.583 43.0295 152.548 43.0119 152.513C42.6941 151.93 42.3586 151.293 42.0231 150.64C42.0054 150.604 41.9701 150.587 41.9348 150.604C41.8995 150.622 41.8818 150.657 41.8995 150.693C42.235 151.364 42.5528 152 42.8883 152.583C42.9236 152.583 42.9413 152.601 42.9589 152.601Z"
                            fill="white"></path>
                        <path
                            d="M37.3623 137.177C37.3623 137.442 37.38 137.725 37.4329 138.025C37.4329 138.06 37.4682 138.078 37.5036 138.078C37.5036 138.078 37.5036 138.078 37.5212 138.078C37.5565 138.078 37.5742 138.043 37.5742 138.007C37.5389 137.707 37.5036 137.424 37.5036 137.177C37.5036 136.311 37.7508 135.993 37.7508 135.976C37.7684 135.958 37.7684 135.923 37.7508 135.905C37.6978 135.94 37.6448 135.976 37.5742 135.993C37.4859 136.17 37.3623 136.523 37.3623 137.177Z"
                            fill="white"></path>
                        <path
                            d="M38.4212 141.788C38.4389 141.824 38.4565 141.841 38.4918 141.841H38.5095C38.5448 141.824 38.5625 141.788 38.5448 141.753C38.3153 141.046 38.121 140.357 37.9445 139.721C37.9268 139.686 37.8915 139.668 37.8562 139.668C37.8209 139.686 37.8032 139.721 37.8032 139.757C37.9974 140.393 38.1917 141.082 38.4212 141.788Z"
                            fill="white"></path>
                        <path
                            d="M43.9305 154.014C43.9129 153.979 43.8776 153.979 43.8422 153.997C43.8069 154.014 43.8069 154.05 43.8246 154.085C44.2484 154.739 44.6721 155.304 45.0782 155.781C45.0959 155.728 45.1135 155.675 45.1312 155.64C44.7427 155.18 44.3366 154.633 43.9305 154.014Z"
                            fill="white"></path>
                        <path
                            d="M46.3495 156.929C46.3318 156.965 46.3318 157 46.3671 157.018C46.7379 157.283 47.0911 157.477 47.4442 157.583C47.4266 157.53 47.4266 157.477 47.4089 157.424C47.0911 157.318 46.7733 157.141 46.4554 156.894C46.4201 156.894 46.3671 156.912 46.3495 156.929Z"
                            fill="white"></path>
                        <path
                            d="M45.0781 155.799C45.0958 155.816 45.1134 155.816 45.1311 155.816C45.1488 155.816 45.1664 155.816 45.1664 155.799C45.2017 155.781 45.2017 155.728 45.1664 155.71C45.1488 155.693 45.1311 155.657 45.0958 155.64C45.1134 155.675 45.0958 155.728 45.0781 155.799C45.0781 155.781 45.0781 155.799 45.0781 155.799Z"
                            fill="white"></path>
                        <path
                            d="M48.1145 157.707C48.2028 157.707 48.2734 157.707 48.3617 157.689C48.397 157.689 48.4323 157.654 48.4146 157.618C48.4146 157.583 48.3793 157.565 48.344 157.565C48.2734 157.583 48.1851 157.583 48.1145 157.583C47.8849 157.583 47.6377 157.53 47.4082 157.459C47.4259 157.512 47.4435 157.565 47.4435 157.618C47.6731 157.671 47.9026 157.707 48.1145 157.707Z"
                            fill="white"></path>
                        <path
                            d="M22.8837 182.194C22.8661 182.159 22.8307 182.141 22.7954 182.159C22.1598 182.459 21.5065 182.742 20.8532 182.989C20.8355 183.007 20.8179 183.024 20.8179 183.042C20.8708 183.06 20.9415 183.06 20.9944 183.077C21.6124 182.848 22.2481 182.565 22.8484 182.265C22.8837 182.282 22.9014 182.229 22.8837 182.194Z"
                            fill="white"></path>
                        <path
                            d="M27.5445 179.261C27.5621 179.279 27.5798 179.279 27.5975 179.279C27.6151 179.279 27.6328 179.279 27.6328 179.261C27.9683 178.996 28.3037 178.714 28.6392 178.431C28.6039 178.396 28.5686 178.378 28.5333 178.343C28.1978 178.625 27.88 178.89 27.5445 179.155C27.5268 179.191 27.5268 179.244 27.5445 179.261Z"
                            fill="white"></path>
                        <path
                            d="M26.1324 180.215C25.5497 180.622 24.9494 180.993 24.3491 181.346C24.3138 181.364 24.3138 181.399 24.3314 181.434C24.3491 181.452 24.3667 181.47 24.3844 181.47C24.4021 181.47 24.4021 181.47 24.4197 181.47C25.02 181.116 25.6204 180.745 26.2207 180.339C26.256 180.321 26.256 180.268 26.2384 180.251C26.203 180.198 26.1677 180.198 26.1324 180.215Z"
                            fill="white"></path>
                        <path
                            d="M29.2571 177.919C29.2924 177.901 29.2924 177.848 29.2571 177.83C29.2394 177.795 29.1864 177.795 29.1688 177.83C28.9569 178.025 28.745 178.201 28.5508 178.378C28.5861 178.413 28.6214 178.431 28.6567 178.466C28.8509 178.272 29.0452 178.095 29.2571 177.919Z"
                            fill="white"></path>
                        <path
                            d="M31.9761 175.039C31.9408 175.021 31.9055 175.021 31.8879 175.039C31.4111 175.569 30.9344 176.099 30.44 176.576C30.4223 176.593 30.4223 176.646 30.44 176.664C30.4577 176.682 30.4753 176.682 30.493 176.682C30.5106 176.682 30.5283 176.682 30.5459 176.664C31.0403 176.169 31.5171 175.657 31.9938 175.109C32.0115 175.109 32.0115 175.074 31.9761 175.039Z"
                            fill="white"></path>
                        <path
                            d="M41.6521 158.272C41.6167 158.255 41.5814 158.272 41.5638 158.308C41.3342 158.908 41.087 159.527 40.8398 160.127H40.9811C41.2283 159.544 41.4578 158.944 41.6874 158.361C41.705 158.325 41.6874 158.29 41.6521 158.272Z"
                            fill="white"></path>
                        <path
                            d="M42.9057 154.58C42.8703 154.562 42.835 154.597 42.8174 154.633C42.8174 154.633 42.6055 155.41 42.1817 156.664C42.1641 156.7 42.1817 156.735 42.217 156.753H42.2347C42.27 156.753 42.2877 156.735 42.3053 156.7C42.7467 155.428 42.941 154.668 42.9586 154.668C42.9586 154.615 42.941 154.58 42.9057 154.58Z"
                            fill="white"></path>
                        <path
                            d="M40.7872 160.286C40.7695 160.322 40.7872 160.357 40.8225 160.375H40.8402C40.8578 160.375 40.8931 160.357 40.8931 160.339C40.9285 160.269 40.9461 160.198 40.9814 160.127H40.8402C40.8402 160.198 40.8225 160.251 40.7872 160.286Z"
                            fill="white"></path>
                        <path
                            d="M36.5674 168.784C36.5321 168.767 36.4968 168.767 36.4791 168.802C36.1083 169.403 35.7199 170.003 35.3314 170.586C35.3138 170.622 35.3138 170.657 35.3491 170.675C35.3667 170.675 35.3667 170.692 35.3844 170.692C35.402 170.692 35.4197 170.675 35.4374 170.657C35.8258 170.074 36.2143 169.473 36.5851 168.873C36.6027 168.837 36.6027 168.802 36.5674 168.784Z"
                            fill="white"></path>
                        <path
                            d="M34.4132 172.018C34.3779 172 34.3426 172 34.325 172.035C33.9012 172.618 33.4774 173.184 33.036 173.714C33.0184 173.749 33.0184 173.784 33.0537 173.802C33.0713 173.82 33.089 173.82 33.089 173.82C33.1066 173.82 33.1243 173.82 33.142 173.802C33.5834 173.254 34.0071 172.689 34.4309 172.124C34.4486 172.071 34.4309 172.035 34.4132 172.018Z"
                            fill="white"></path>
                        <path
                            d="M38.5095 165.481C38.5271 165.445 38.5095 165.41 38.4742 165.392C38.4389 165.375 38.4035 165.392 38.3859 165.428C38.0504 166.064 37.7149 166.682 37.3618 167.283C37.3441 167.318 37.3618 167.353 37.3795 167.371C37.3971 167.371 37.3971 167.371 37.4148 167.371C37.4324 167.371 37.4677 167.353 37.4677 167.336C37.8385 166.735 38.1917 166.117 38.5095 165.481Z"
                            fill="white"></path>
                        <path
                            d="M39.2332 163.926C39.2508 163.926 39.2508 163.926 39.2685 163.926C39.2861 163.926 39.3214 163.908 39.3214 163.89C39.6216 163.254 39.9394 162.618 40.2219 161.965C40.2396 161.929 40.2219 161.894 40.1866 161.876C40.1513 161.859 40.116 161.876 40.0983 161.912C39.8158 162.565 39.5157 163.201 39.1978 163.837C39.1802 163.873 39.1978 163.908 39.2332 163.926Z"
                            fill="white"></path>
                        <path
                            d="M20.8179 183.095C20.8355 183.13 20.8532 183.13 20.8885 183.13H20.9062C20.9415 183.113 20.9591 183.113 20.9944 183.095C20.9415 183.077 20.8708 183.077 20.8179 183.06C20.8179 183.06 20.8179 183.077 20.8179 183.095Z"
                            fill="white"></path>
                        <path
                            d="M19.193 183.554C18.522 183.749 17.8334 183.908 17.1448 184.049C17.1095 184.049 17.0918 184.084 17.0918 184.12C17.0918 184.155 17.1271 184.173 17.1624 184.173C17.1624 184.173 17.1624 184.173 17.1801 184.173C17.8687 184.049 18.5573 183.872 19.2459 183.678C19.2812 183.66 19.2989 183.625 19.2989 183.59C19.2636 183.572 19.2283 183.554 19.193 183.554Z"
                            fill="white"></path>
                        <path
                            d="M15.4141 184.314C15.2375 184.332 15.0433 184.35 14.8667 184.367C14.8314 184.367 14.7961 184.403 14.8138 184.438C14.8138 184.473 14.8491 184.491 14.8844 184.491C15.061 184.473 15.2552 184.456 15.4318 184.438C15.4671 184.438 15.5024 184.403 15.4847 184.367C15.4847 184.332 15.4494 184.314 15.4141 184.314Z"
                            fill="white"></path>
                        <path
                            d="M48.9093 101.4C48.9093 101.4 48.927 101.4 48.927 101.383C49.2448 100.747 49.5626 100.111 49.8628 99.4745C49.8628 99.4569 49.8628 99.4569 49.8451 99.4392C49.8275 99.4392 49.8275 99.4392 49.8098 99.4569C49.492 100.075 49.1918 100.729 48.874 101.365C48.8917 101.383 48.8917 101.4 48.9093 101.4Z"
                            fill="white"></path>
                        <path
                            d="M47.214 104.898C47.214 104.898 47.2317 104.898 47.2317 104.881C47.5495 104.209 47.8673 103.573 48.1498 102.973C48.1498 102.955 48.1498 102.955 48.1322 102.937C48.1145 102.937 48.1145 102.937 48.0969 102.955C47.7967 103.556 47.4965 104.209 47.1787 104.863C47.1787 104.881 47.1787 104.898 47.214 104.898C47.1964 104.898 47.1964 104.898 47.214 104.898Z"
                            fill="white"></path>
                        <path
                            d="M51.5755 95.9764C51.5755 95.9764 51.2224 96.6831 50.6221 97.8845C50.6221 97.9021 50.6221 97.9022 50.6397 97.9198C50.6397 97.9198 50.6397 97.9198 50.6574 97.9198C50.6574 97.9198 50.675 97.9198 50.675 97.9021C51.2754 96.7007 51.6285 96.0117 51.6285 95.994C51.6285 95.9764 51.6285 95.9764 51.6108 95.9587C51.5932 95.9587 51.5755 95.9587 51.5755 95.9764Z"
                            fill="white"></path>
                        <path
                            d="M35.3842 131.364C35.3842 131.347 35.3842 131.347 35.3666 131.329C35.3489 131.329 35.3489 131.329 35.3313 131.347C35.2783 131.471 35.2253 131.612 35.1724 131.736C35.19 131.718 35.2253 131.7 35.243 131.7C35.296 131.594 35.3489 131.488 35.3842 131.364Z"
                            fill="white"></path>
                        <path
                            d="M36.0373 129.739C36.0373 129.739 36.0549 129.739 36.0549 129.721C36.3198 129.085 36.5846 128.432 36.8671 127.76C36.8671 127.743 36.8671 127.743 36.8495 127.725C36.8318 127.725 36.8318 127.725 36.8142 127.743C36.5317 128.414 36.2668 129.068 36.002 129.704C36.002 129.721 36.0196 129.739 36.0373 129.739C36.0196 129.739 36.0196 129.739 36.0373 129.739Z"
                            fill="white"></path>
                        <path
                            d="M37.5206 126.153C37.5382 126.153 37.5382 126.153 37.5559 126.135C37.8208 125.499 38.1033 124.845 38.3858 124.192C38.3858 124.174 38.3858 124.174 38.3681 124.156C38.3505 124.156 38.3505 124.156 38.3328 124.174C38.0503 124.828 37.7678 125.481 37.5029 126.117C37.5029 126.135 37.5029 126.135 37.5206 126.153Z"
                            fill="white"></path>
                        <path
                            d="M40.6281 119.015C40.6281 119.015 40.6457 119.015 40.6457 118.997C40.9283 118.361 41.2284 117.707 41.5109 117.054C41.5109 117.036 41.5109 117.036 41.4933 117.018C41.4756 117.018 41.4756 117.018 41.458 117.036C41.1578 117.69 40.8753 118.344 40.5928 118.98C40.6104 118.997 40.6104 119.015 40.6281 119.015Z"
                            fill="white"></path>
                        <path
                            d="M43.8771 111.93C43.8771 111.93 43.8948 111.93 43.8948 111.913C44.1949 111.276 44.4951 110.64 44.7953 109.987C44.7953 109.969 44.7953 109.969 44.7776 109.951C44.76 109.951 44.7599 109.951 44.7423 109.969C44.4421 110.605 44.142 111.259 43.8418 111.895C43.8418 111.913 43.8595 111.93 43.8771 111.93C43.8595 111.93 43.8771 111.93 43.8771 111.93Z"
                            fill="white"></path>
                        <path
                            d="M45.5192 108.414C45.5192 108.414 45.5369 108.414 45.5369 108.397C45.8547 107.743 46.1548 107.107 46.455 106.489C46.455 106.471 46.455 106.471 46.4373 106.453C46.4197 106.453 46.4197 106.453 46.402 106.471C46.1019 107.089 45.8017 107.725 45.4839 108.397C45.5015 108.397 45.5015 108.414 45.5192 108.414Z"
                            fill="white"></path>
                        <path
                            d="M39.0568 122.566C39.0568 122.566 39.0745 122.566 39.0745 122.548C39.357 121.895 39.6395 121.259 39.922 120.605C39.922 120.587 39.922 120.587 39.9043 120.57C39.8867 120.57 39.8867 120.57 39.869 120.587C39.5865 121.223 39.304 121.877 39.0215 122.531C39.0391 122.548 39.0391 122.566 39.0568 122.566Z"
                            fill="white"></path>
                        <path
                            d="M42.2173 115.446C42.2173 115.464 42.2173 115.464 42.2349 115.481C42.2349 115.481 42.2349 115.481 42.2526 115.481C42.2526 115.481 42.2703 115.481 42.2703 115.464C42.5528 114.845 42.8529 114.192 43.1531 113.538C43.1531 113.52 43.1531 113.52 43.1354 113.503C43.1178 113.503 43.1178 113.503 43.1001 113.52C42.8 114.174 42.4998 114.828 42.2173 115.446Z"
                            fill="white"></path>
                        <path
                            d="M34.5723 133.326C34.5723 133.343 34.5723 133.343 34.5899 133.361C34.6076 133.361 34.6076 133.361 34.6076 133.343C34.8195 132.813 35.0313 132.248 35.2609 131.7C35.2432 131.718 35.2256 131.736 35.1903 131.736C34.9784 132.283 34.7665 132.813 34.5723 133.326Z"
                            fill="white"></path>
                        <path
                            d="M33.9717 134.969C33.9541 134.969 33.9541 134.969 33.9364 134.986C33.6716 135.675 33.4244 136.347 33.1948 136.983C33.1948 137 33.1948 137 33.2125 137.018C33.2301 137.018 33.2301 137.018 33.2301 137C33.4597 136.364 33.7069 135.693 33.9717 135.004C33.9894 134.986 33.9717 134.969 33.9717 134.969Z"
                            fill="white"></path>
                        <path
                            d="M114.116 65.5352C114.116 65.5352 112.12 64.4398 110.867 64.7755C109.384 65.1642 108.96 67.5316 114.116 75.9944C114.116 75.9944 115.881 72.7965 117.047 69.7577C118.477 66.0122 118.989 62.4964 114.116 65.5352Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M119.713 62.0547C118.848 61.242 117.047 61.6837 114.345 63.3797C113.851 63.1147 110.055 61.189 108.536 62.7967C108.466 62.8674 108.395 62.9557 108.342 63.0617C107 65.0935 108.995 70.4998 114.292 79.1745L114.363 79.2982L114.434 79.1569C114.61 78.8565 116.729 74.9873 118.371 70.9768C119.89 67.1959 121.02 63.2914 119.713 62.0547ZM118.212 70.8355C116.694 74.5633 114.751 78.2028 114.345 78.9449C107.989 68.4857 107.565 64.5635 108.483 63.1501C108.536 63.0617 108.607 62.9911 108.66 62.9204C109.048 62.4964 109.631 62.355 110.267 62.355C112.05 62.355 114.275 63.5564 114.31 63.5741L114.363 63.5918L114.398 63.5564C117.047 61.8957 118.812 61.4363 119.607 62.196C120.808 63.3444 119.713 67.1429 118.212 70.8355Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M110.603 3.89308C110.603 3.89308 108.607 2.79769 107.354 3.13337C105.87 3.52206 105.447 5.88951 110.603 14.3523C110.603 14.3523 112.368 11.1544 113.534 8.11562C114.964 4.35244 115.476 0.836591 110.603 3.89308Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M116.199 0.394907C115.334 -0.4178 113.533 0.0238885 110.832 1.71997C110.337 1.45496 106.541 -0.470803 105.023 1.13694C104.952 1.20761 104.881 1.29595 104.828 1.40196C103.469 3.41606 105.464 8.84 110.743 17.4971L110.814 17.6208L110.885 17.4794C111.061 17.1791 113.18 13.3099 114.822 9.29935C116.376 5.53617 117.488 1.63164 116.199 0.394907ZM114.681 9.17568C113.162 12.9035 111.22 16.5431 110.814 17.2851C104.458 6.8259 104.034 2.9037 104.952 1.4903C105.005 1.40196 105.076 1.33129 105.129 1.26062C105.517 0.836596 106.1 0.695256 106.735 0.695256C108.519 0.695256 110.743 1.89665 110.779 1.91432L110.832 1.93198L110.867 1.89665C113.516 0.235899 115.281 -0.223457 116.076 0.536248C117.294 1.68464 116.199 5.48316 114.681 9.17568Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M24.2075 52.3728L24.2782 52.4965L24.3488 52.3552C24.6843 51.7545 32.3297 37.8148 29.6458 35.253C28.7807 34.4403 26.9797 34.882 24.2782 36.5781C23.7838 36.313 19.9876 34.3873 18.4691 35.995C16.7564 37.7971 18.681 43.3094 24.2075 52.3728ZM18.5927 36.1187C18.9811 35.6947 19.5638 35.5533 20.1995 35.5533C21.9828 35.5533 24.2075 36.7547 24.2429 36.7724L24.2958 36.7901L24.3311 36.7547C26.9797 35.094 28.7453 34.6346 29.5399 35.3943C31.9942 37.7264 25.0727 50.6768 24.2782 52.1432C17.5333 41.0479 17.4626 37.3024 18.5927 36.1187Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M24.2073 49.5814C24.2073 49.5814 33.2299 33.2389 24.2073 38.8925C24.2073 38.8748 14.4607 33.5922 24.2073 49.5814Z"
                            fill="#E56865"></path>
                        <path
                            d="M120.561 91.9659C120.561 91.9659 117.347 90.2168 120.561 95.4817C120.561 95.4994 123.527 90.1108 120.561 91.9659Z"
                            fill="#E56865"></path>
                        <path
                            d="M100.944 22.126C100.944 22.126 97.7303 20.3769 100.944 25.6418C100.944 25.6418 103.91 20.2709 100.944 22.126Z"
                            fill="#E56865"></path>
                        <path
                            d="M31.0933 53.5566C31.0933 53.5566 27.8797 51.8075 31.0933 57.0724C31.0933 57.0901 34.0596 51.7015 31.0933 53.5566Z"
                            fill="#E56865"></path>
                        <path
                            d="M28.2684 72.9909C29.0388 72.9909 29.6633 72.366 29.6633 71.5951C29.6633 70.8243 29.0388 70.1994 28.2684 70.1994C27.498 70.1994 26.8735 70.8243 26.8735 71.5951C26.8735 72.366 27.498 72.9909 28.2684 72.9909Z"
                            fill="#E56865"></path>
                        <path
                            d="M110.585 84.9518C110.975 84.9518 111.291 84.6354 111.291 84.2451C111.291 83.8548 110.975 83.5384 110.585 83.5384C110.195 83.5384 109.878 83.8548 109.878 84.2451C109.878 84.6354 110.195 84.9518 110.585 84.9518Z"
                            fill="#E56865"></path>
                        <path
                            d="M120.508 6.84357C120.898 6.84357 121.214 6.52717 121.214 6.13687C121.214 5.74657 120.898 5.43016 120.508 5.43016C120.118 5.43016 119.802 5.74657 119.802 6.13687C119.802 6.52717 120.118 6.84357 120.508 6.84357Z"
                            fill="#E56865"></path>
                        <path
                            d="M106.541 181.823C106.806 182 107.071 182.159 107.353 182.335C107.194 182.106 107.035 181.858 106.894 181.629C106.771 181.682 106.647 181.752 106.541 181.823Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M106.541 181.823C106.806 182 107.071 182.159 107.353 182.335C107.194 182.106 107.035 181.858 106.894 181.629C106.771 181.682 106.647 181.752 106.541 181.823Z"
                              fill="white"></path>
                        <path
                            d="M101.332 172.035C101.156 172.512 100.979 173.007 100.785 173.502C98.4895 179.597 104.652 176.134 102.321 178.926C103.751 179.986 105.164 180.957 106.523 181.823C106.629 181.752 106.753 181.682 106.859 181.611C105.023 178.767 103.169 175.569 101.332 172.035Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M87.8952 160.145H87.9129H95.8055C94.7814 157.76 93.7573 155.41 92.7332 153.131C86.006 149.103 80.0909 146.152 77.8132 145.039L77.6543 154.368C78.8903 156.17 80.4264 158.131 82.1568 160.163H87.8952V160.145Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M100.803 173.502C100.979 173.007 101.173 172.53 101.35 172.035C99.7079 168.873 98.0835 165.428 96.5297 161.753C96.3002 161.223 96.0706 160.675 95.8411 160.145H87.9308L87.9485 160.163L85.918 164.314C86.4124 164.845 86.9244 165.375 87.4365 165.887L89.2728 162.141L89.3081 162.159L87.4894 165.905C92.1155 170.604 97.3772 175.268 102.339 178.926C104.652 176.134 98.4896 179.579 100.803 173.502Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M82.1748 160.145C83.3225 161.488 84.5761 162.883 85.9004 164.261L87.9133 160.145H82.1748Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M106.877 181.611C107.036 181.858 107.195 182.088 107.336 182.318C114.257 186.576 119.731 187.848 120.49 182.883C120.949 179.844 119.802 176.646 117.612 173.431C114.328 176.487 110.726 179.226 106.877 181.611Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M107.018 162.795C106.365 162.318 105.711 161.841 105.04 161.346C103.963 164.756 102.727 168.307 101.35 172.053C103.186 175.586 105.04 178.784 106.894 181.629C110.744 179.261 114.345 176.523 117.647 173.466C115.158 169.827 111.344 166.187 107.018 162.795Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M103.416 160.145C102.868 159.739 102.321 159.332 101.756 158.908C98.7544 156.823 95.6644 154.862 92.7334 153.113C93.7575 155.41 94.7816 157.742 95.8057 160.127H103.416V160.145Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M95.8232 160.145C96.0528 160.675 96.2823 161.223 96.5118 161.753C98.0833 165.445 99.6901 168.873 101.332 172.035C102.709 168.29 103.945 164.738 105.022 161.329C104.493 160.94 103.945 160.534 103.416 160.145H95.8232Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M107.018 162.795C106.364 162.283 105.711 161.788 105.058 161.293C105.058 161.311 105.04 161.329 105.04 161.346C105.711 161.823 106.364 162.318 107.018 162.795Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M107.018 162.795C106.364 162.283 105.711 161.788 105.058 161.293C105.058 161.311 105.04 161.329 105.04 161.346C105.711 161.823 106.364 162.318 107.018 162.795Z"
                              fill="white"></path>
                        <path
                            d="M103.504 160.145C102.922 159.739 102.357 159.315 101.774 158.908C102.321 159.315 102.886 159.739 103.434 160.145H103.504Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M103.504 160.145C102.922 159.739 102.357 159.315 101.774 158.908C102.321 159.315 102.886 159.739 103.434 160.145H103.504Z"
                              fill="white"></path>
                        <path
                            d="M103.416 160.145C103.963 160.551 104.493 160.94 105.022 161.329C105.022 161.311 105.04 161.293 105.04 161.276C104.528 160.887 104.016 160.516 103.486 160.145H103.416Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M103.416 160.145C103.963 160.551 104.493 160.94 105.022 161.329C105.022 161.311 105.04 161.293 105.04 161.276C104.528 160.887 104.016 160.516 103.486 160.145H103.416Z"
                              fill="white"></path>
                        <path
                            d="M74.335 146.771V147.089C74.4056 148.838 75.6416 151.4 77.6721 154.35L77.831 145.022C77.1777 144.704 76.8246 144.544 76.8246 144.544C75.1648 144.686 74.3879 145.481 74.335 146.771Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M117.63 173.449C115.158 169.827 111.344 166.187 107.018 162.795C106.364 162.318 105.711 161.841 105.04 161.346C104.511 160.958 103.963 160.551 103.433 160.163C102.886 159.756 102.339 159.35 101.774 158.926C98.7721 156.841 95.6821 154.88 92.7511 153.131C86.0238 149.103 80.1088 146.152 77.8311 145.039C77.1778 144.721 76.8247 144.562 76.8247 144.562C75.1473 144.686 74.3704 145.499 74.3174 146.788V147.106C74.388 148.855 75.624 151.417 77.6545 154.368C78.8905 156.17 80.4266 158.131 82.157 160.163C83.3047 161.505 84.5583 162.901 85.8826 164.279L87.8955 160.163V160.145L87.9131 160.163L87.9308 160.18L85.9002 164.332C86.3946 164.862 86.9067 165.392 87.4187 165.905L89.255 162.159L89.2904 162.177L87.4894 165.905C92.1154 170.604 97.3772 175.268 102.339 178.926C103.769 179.986 105.181 180.957 106.541 181.823C106.647 181.752 106.771 181.682 106.877 181.611C107.035 181.858 107.194 182.088 107.336 182.318C114.257 186.576 119.731 187.848 120.49 182.883C120.967 179.844 119.819 176.646 117.63 173.449Z"
                              fill="white"></path>
                        <path d="M74.335 147.089V146.771C74.3174 146.877 74.3174 146.983 74.335 147.089Z"
                              fill="#EA8C8C"></path>
                        <path opacity="0.1" d="M74.335 147.089V146.771C74.3174 146.877 74.3174 146.983 74.335 147.089Z"
                              fill="white"></path>
                        <path d="M87.8955 160.145H87.9318L87.9136 160.127L87.8955 160.145Z" fill="white"></path>
                        <path opacity="0.1" d="M87.8955 160.145H87.9318L87.9136 160.127L87.8955 160.145Z"
                              fill="white"></path>
                        <path
                            d="M87.9309 160.145H87.9133L85.9004 164.261C85.918 164.279 85.918 164.279 85.9357 164.297L87.9662 160.145H87.9309Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M87.9309 160.145H87.9133L85.9004 164.261C85.918 164.279 85.918 164.279 85.9357 164.297L87.9662 160.145H87.9309Z"
                              fill="white"></path>
                        <path
                            d="M89.2728 162.124L87.4365 165.869C87.4542 165.887 87.4542 165.887 87.4718 165.905L89.3081 162.141L89.2728 162.124Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M89.2728 162.124L87.4365 165.869C87.4542 165.887 87.4542 165.887 87.4718 165.905L89.3081 162.141L89.2728 162.124Z"
                              fill="white"></path>
                        <path
                            d="M103.098 123.255C103.098 123.255 104.652 130.711 106.17 141.011C108.589 142.848 109.631 141.718 107.865 135.446C101.35 112.354 95.5233 104.792 91.6035 102.655L103.098 123.255Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M86.4126 102.867C84.4527 103.856 85.4945 108.273 87.9664 113.803L92.1864 105.181C92.1864 105.163 92.204 105.163 92.2217 105.163C92.2394 105.163 92.2394 105.181 92.2394 105.199L88.0017 113.856C88.2842 114.492 88.5844 115.146 88.9022 115.799L93.0163 107.372L93.0516 107.39L88.9199 115.852C91.8509 121.93 96.1768 128.909 100.026 134.121L101.333 131.453L101.368 131.47L100.061 134.156C102.41 137.318 104.599 139.827 106.188 141.029C104.67 130.746 103.116 123.273 103.116 123.273L91.6037 102.655C88.3725 100.906 86.4126 102.867 86.4126 102.867Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M107.866 135.446C101.35 112.354 95.5235 104.792 91.6037 102.655C88.3725 100.906 86.4126 102.849 86.4126 102.849C84.4527 103.838 85.4945 108.255 87.9664 113.785L92.1864 105.164C92.1864 105.146 92.2041 105.146 92.2217 105.146C92.2394 105.146 92.2394 105.164 92.2394 105.181L88.0017 113.838C88.2842 114.474 88.5844 115.128 88.9022 115.782L93.0163 107.354L93.0516 107.372L88.9199 115.835C91.8509 121.912 96.1768 128.891 100.026 134.103L101.333 131.435L101.368 131.453L100.061 134.138C102.41 137.301 104.599 139.81 106.188 141.011C108.59 142.848 109.649 141.718 107.866 135.446Z"
                              fill="white"></path>
                        <path
                            d="M92.2035 105.146C92.1858 105.146 92.1858 105.146 92.1681 105.163L87.9658 113.785C87.9658 113.803 87.9835 113.821 87.9835 113.838L92.2211 105.181C92.2211 105.163 92.2211 105.146 92.2035 105.146Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M92.2035 105.146C92.1858 105.146 92.1858 105.146 92.1681 105.163L87.9658 113.785C87.9658 113.803 87.9835 113.821 87.9835 113.838L92.2211 105.181C92.2211 105.163 92.2211 105.146 92.2035 105.146Z"
                              fill="white"></path>
                        <path
                            d="M93.0159 107.354L88.9019 115.782C88.9019 115.799 88.9195 115.817 88.9195 115.835L93.0512 107.372L93.0159 107.354Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M93.0159 107.354L88.9019 115.782C88.9019 115.799 88.9195 115.817 88.9195 115.835L93.0512 107.372L93.0159 107.354Z"
                              fill="white"></path>
                        <path
                            d="M101.367 131.453L101.332 131.435L100.025 134.103C100.043 134.121 100.043 134.138 100.061 134.138L101.367 131.453Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M101.367 131.453L101.332 131.435L100.025 134.103C100.043 134.121 100.043 134.138 100.061 134.138L101.367 131.453Z"
                              fill="white"></path>
                        <path
                            d="M54.4358 53.4859C51.134 53.0442 48.9622 51.9665 47.9205 50.2351C46.1548 47.2846 48.3266 43.2741 49.1565 41.9137C48.5208 41.472 46.9317 41.8783 45.9959 44.7228C44.1596 50.3588 45.1837 53.6096 47.638 55.4117C49.8451 54.652 52.1228 53.9983 54.4358 53.4859Z"
                            fill="#648EE5"></path>
                        <path opacity="0.1"
                              d="M54.4358 53.4859C51.134 53.0442 48.9622 51.9665 47.9205 50.2351C46.1548 47.2846 48.3266 43.2741 49.1565 41.9137C48.5208 41.472 46.9317 41.8783 45.9959 44.7228C44.1596 50.3588 45.1837 53.6096 47.638 55.4117C49.8451 54.652 52.1228 53.9983 54.4358 53.4859Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M48.0264 50.1467C49.0858 51.9135 51.3635 52.9912 54.8066 53.3799C57.5434 52.7792 60.3332 52.3198 63.1759 52.0372C58.9383 51.5601 53.9414 51.4365 52.0521 49.1574C50.0569 46.7369 50.1805 42.903 49.2447 41.9667C48.4148 43.3447 46.296 47.2669 48.0264 50.1467Z"
                            fill="#648EE5"></path>
                        <path opacity="0.1"
                              d="M48.0264 50.1467C49.0858 51.9135 51.3635 52.9912 54.8066 53.3799C57.5434 52.7792 60.3332 52.3198 63.1759 52.0372C58.9383 51.5601 53.9414 51.4365 52.0521 49.1574C50.0569 46.7369 50.1805 42.903 49.2447 41.9667C48.4148 43.3447 46.296 47.2669 48.0264 50.1467Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M66.8839 56.2774C71.6689 55.5884 68.8792 53.6273 68.8792 53.6273C67.6785 52.7086 65.5597 52.3199 63.2113 52.0549C60.3686 52.3375 57.5788 52.7792 54.842 53.3976C57.6318 53.7156 61.1984 53.5919 65.5244 53.0089C65.5597 53.0089 65.595 53.0266 65.595 53.0619C65.595 53.0972 65.5773 53.1326 65.542 53.1326C62.7522 53.5036 60.2626 53.6979 58.1085 53.6979C56.7666 53.6979 55.5659 53.6273 54.4712 53.4859C52.1582 54.016 49.8981 54.652 47.6733 55.4117C52.2818 58.8039 62.0107 56.9841 66.8839 56.2774Z"
                            fill="#648EE5"></path>
                        <path opacity="0.1"
                              d="M66.8839 56.2774C71.6689 55.5884 68.8792 53.6273 68.8792 53.6273C67.6785 52.7086 65.5597 52.3199 63.2113 52.0549C60.3686 52.3375 57.5788 52.7792 54.842 53.3976C57.6318 53.7156 61.1984 53.5919 65.5244 53.0089C65.5597 53.0089 65.595 53.0266 65.595 53.0619C65.595 53.0972 65.5773 53.1326 65.542 53.1326C62.7522 53.5036 60.2626 53.6979 58.1085 53.6979C56.7666 53.6979 55.5659 53.6273 54.4712 53.4859C52.1582 54.016 49.8981 54.652 47.6733 55.4117C52.2818 58.8039 62.0107 56.9841 66.8839 56.2774Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M47.9028 50.2174C48.9445 51.9488 51.1163 53.0442 54.4181 53.4682C54.5417 53.4329 54.6653 53.4152 54.8066 53.3799C51.3459 52.9912 49.0681 51.9135 48.0264 50.1467C46.296 47.2669 48.4148 43.3447 49.2624 41.9843C49.2447 41.9667 49.227 41.949 49.2094 41.9313C49.1917 41.9137 49.1741 41.896 49.1564 41.896C48.3089 43.2564 46.1371 47.2669 47.9028 50.2174Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M47.9028 50.2174C48.9445 51.9488 51.1163 53.0442 54.4181 53.4682C54.5417 53.4329 54.6653 53.4152 54.8066 53.3799C51.3459 52.9912 49.0681 51.9135 48.0264 50.1467C46.296 47.2669 48.4148 43.3447 49.2624 41.9843C49.2447 41.9667 49.227 41.949 49.2094 41.9313C49.1917 41.9137 49.1741 41.896 49.1564 41.896C48.3089 43.2564 46.1371 47.2669 47.9028 50.2174Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M58.0734 53.6979C60.2275 53.6979 62.7171 53.5036 65.5069 53.1326C65.5422 53.1326 65.5599 53.0972 65.5599 53.0619C65.5599 53.0266 65.5246 52.9912 65.4893 53.0089C61.1633 53.5919 57.5967 53.7156 54.8069 53.3976C54.6833 53.4329 54.5597 53.4506 54.4185 53.4859C55.5308 53.6273 56.7315 53.6979 58.0734 53.6979Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M58.0734 53.6979C60.2275 53.6979 62.7171 53.5036 65.5069 53.1326C65.5422 53.1326 65.5599 53.0972 65.5599 53.0619C65.5599 53.0266 65.5246 52.9912 65.4893 53.0089C61.1633 53.5919 57.5967 53.7156 54.8069 53.3976C54.6833 53.4329 54.5597 53.4506 54.4185 53.4859C55.5308 53.6273 56.7315 53.6979 58.0734 53.6979Z"
                              fill="#F9F9F9"></path>
                        <path
                            d="M19.9698 170.904C18.9457 170.851 17.9216 170.745 16.9151 170.604C15.2907 175.003 15.5203 178.113 19.5637 177.83C21.5236 177.689 23.4482 176.947 25.2492 175.781C23.4128 174.244 21.6472 172.618 19.9698 170.904Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M19.9697 170.904C21.6471 172.618 23.4128 174.244 25.2491 175.781C27.2443 174.491 29.0983 172.654 30.7404 170.533C29.5397 170.692 24.843 171.205 19.9697 170.904Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M31.6053 165.728L31.0933 170.092C31.3228 169.791 31.5347 169.473 31.7642 169.173C31.6936 168.007 31.6583 166.859 31.6053 165.728Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M31.6053 165.728L31.0933 170.092C31.3228 169.791 31.5347 169.473 31.7642 169.173C31.6936 168.007 31.6583 166.859 31.6053 165.728Z"
                              fill="white"></path>
                        <path
                            d="M36.2849 160.145C38.492 153.608 38.4744 147.283 34.7665 145.198C34.7665 145.198 34.4486 145.287 34.0072 145.463L32.2769 160.145H36.2849Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M36.2845 160.145H32.2764L31.6055 165.728C31.6408 166.859 31.6938 168.007 31.7467 169.173C33.6713 166.399 35.2251 163.237 36.2845 160.145Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M19.9697 170.904C19.8637 170.798 19.7754 170.692 19.6695 170.604C19.0162 169.933 18.3806 169.244 17.7626 168.555C17.4447 169.261 17.1622 169.95 16.915 170.622C17.9391 170.745 18.9632 170.851 19.9697 170.904Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M24.9672 160.145L24.0314 157.636C23.7313 158.095 23.4134 158.573 23.1133 159.05L23.5194 160.163H24.9672V160.145Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M23.0777 159.085C22.8482 159.438 22.6363 159.792 22.4067 160.145H23.4838L23.0777 159.085Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M23.0777 159.085C22.8482 159.438 22.6363 159.792 22.4067 160.145H23.4838L23.0777 159.085Z"
                              fill="white"></path>
                        <path
                            d="M31.4647 160.145C31.4117 155.516 31.5177 151.064 31.8531 146.788C30.1051 148.944 27.0328 153.043 24.0488 157.583L25.0023 160.145H31.4647Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M19.6872 164.774C18.9809 166.081 18.3276 167.353 17.7803 168.555C18.3983 169.244 19.0339 169.933 19.6872 170.604V164.774Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M19.9702 170.904C24.8434 171.187 29.5225 170.692 30.7408 170.533C30.8644 170.374 30.9703 170.233 31.0939 170.074L31.606 165.728C31.5354 163.837 31.4824 161.982 31.4647 160.145H25.0024L26.8916 165.216L26.8563 165.233L24.9494 160.163H23.5015L25.5144 165.551L25.4791 165.569L23.4486 160.163H22.3715C21.4004 161.7 20.4822 163.272 19.6523 164.792V170.622C19.7759 170.71 19.8819 170.798 19.9702 170.904Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M31.4641 160.145H32.2587L33.989 145.463C33.3181 145.728 32.3469 146.188 31.8526 146.806C31.5171 151.064 31.4111 155.516 31.4641 160.145Z"
                            fill="#EA8C8C"></path>
                        <path
                            d="M31.4644 160.145C31.482 161.982 31.535 163.837 31.6056 165.728L32.2589 160.145H31.4644Z"
                            fill="#EA8C8C"></path>
                        <path opacity="0.1"
                              d="M34.7662 145.18C34.7662 145.18 34.4483 145.269 34.0069 145.446C33.336 145.711 32.3648 146.17 31.8704 146.788C30.1224 148.944 27.0501 153.043 24.0661 157.583L25.0196 160.145L26.9089 165.215L26.8736 165.233L24.9666 160.163L24.0308 157.654C23.7307 158.113 23.4128 158.59 23.1127 159.067L23.5188 160.18L25.5317 165.569L25.4963 165.587L23.4658 160.18H22.3888C21.4176 161.717 20.4995 163.29 19.6696 164.809C18.9633 166.117 18.31 167.389 17.7627 168.59C17.4448 169.297 17.1623 169.986 16.9151 170.657C15.2907 175.056 15.5203 178.166 19.5637 177.883C21.5236 177.742 23.4482 177 25.2492 175.834C27.2444 174.544 29.0983 172.707 30.7404 170.586C30.864 170.427 30.97 170.286 31.0936 170.127L31.6056 165.728C31.6409 166.859 31.6939 168.007 31.7469 169.173C33.6538 166.399 35.2076 163.254 36.267 160.145C38.4917 153.608 38.4564 147.283 34.7662 145.18Z"
                              fill="white"></path>
                        <path
                            d="M23.5186 160.145L23.1125 159.032C23.0948 159.05 23.0948 159.067 23.0771 159.085L23.4833 160.145H23.5186Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M23.5186 160.145L23.1125 159.032C23.0948 159.05 23.0948 159.067 23.0771 159.085L23.4833 160.145H23.5186Z"
                              fill="white"></path>
                        <path d="M25.4964 165.551L25.5317 165.534L23.5188 160.145H23.4658L25.4964 165.551Z"
                              fill="white"></path>
                        <path opacity="0.1"
                              d="M25.4964 165.551L25.5317 165.534L23.5188 160.145H23.4658L25.4964 165.551Z"
                              fill="white"></path>
                        <path
                            d="M25.002 160.145L24.0485 157.583C24.0308 157.601 24.0308 157.618 24.0132 157.636L24.949 160.145H25.002Z"
                            fill="white"></path>
                        <path opacity="0.1"
                              d="M25.002 160.145L24.0485 157.583C24.0308 157.601 24.0308 157.618 24.0132 157.636L24.949 160.145H25.002Z"
                              fill="white"></path>
                        <path d="M26.8561 165.216L26.909 165.198L25.0021 160.145H24.9668L26.8561 165.216Z"
                              fill="white"></path>
                        <path opacity="0.1" d="M26.8561 165.216L26.909 165.198L25.0021 160.145H24.9668L26.8561 165.216Z"
                              fill="white"></path>
                    </symbol>
                </svg>
            </div>
        </div>
    );
};
export default Insurance;