import React, { useEffect, useRef, useState } from 'react'

function Columns() {


      let checkedOrNot = useRef(null)
      let inputsRadio = useRef(null)
      
      // let imageContainer = document.getElementsByTagName("body");
      // let userDataQuery = getUsersQuery();
      // let radioInput = document.querySelectorAll('.radioInput');
      // let inputs = document.querySelectorAll('.main__inputs');
      // let textArea = document.querySelector('textarea');
      // let btn = document.querySelector('.btn__submit');
      // let admin = null;
      const [radio,setRadio] = useState(null)
      function readioInput(e){

      }
      function enterData(e){
            // e.preventDefault();
            e.stopPropagation()
            if(e.target.className == 'radioInput'){
                  console.log(e.target.value);
                  setRadio(e.target.value)
            }
            else if(e.target.className == 'inputMar'){
                  console.log(e.target.children[0].value );
                  setRadio(e.target.children[0].value)
            }

      }

      function checkInputs(inputs,textArea,checkedOrNot,inputsRadio){
            let res = true
            inputs.forEach(element => {
                  if(element.value.trim() == ''){
                        console.log('error');
                        element.style.cssText = `
                        border:2px solid red
                        `;
                        res = false
                  }
                  else{
                        element.style.cssText = `none`
                  }
                  
            });

            if(textArea.value.trim() == ''){
                  console.log('error');
                  textArea.style.cssText = `border:2px solid red`;
                  res = false
            }
            else{
                  textArea.style.cssText = `none`
            }

            console.log(inputsRadio);
            let radioFalse = false;
            inputsRadio.forEach(item =>{
                  if(item.checked == false){
                        console.log(item.checked);
                  }
                  else if(item.checked){
                        radioFalse = true
                  }
            })
            if(radioFalse){
                  checkedOrNot.style.cssText = ``;
            }
            else{
                  checkedOrNot.style.cssText = `border:4px solid red`;
                  res = false
            }
            return res;
      }

      return (
            <section className="columns">
                  <div className="container">
                        <div className="columns__row">
                              <div className="columns__column">
                                    <form className="main__first checkedOrNot" ref={checkedOrNot}>
                                          <p className="main__firstQuestion">
                                                выберите категорию / Санатты таңданыз
                                          </p>
                                          <div>
                                                <div className="accordion" id="accordionExample">
                                                      <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingOne">
                                                                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        техподдержка IT
                                                                  </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                  <div className="accordion-body" ref={inputsRadio}>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Поломка компьютера" id="PCR" className="radioInput" /> 
                                                                              <label htmlFor="PCR">Поломка компьютера</label> 
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Техподдержка - поломка локальной сети" id="webCabel" className="radioInput"></input> 
                                                                              <label htmlFor="webCabel">Техподдержка - поломка локальной сети</label> 
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Проблемы с принтером - МФУ / телевизор / телефон" id="printer" className="radioInput" /> 
                                                                              <label htmlFor="printer">Проблемы с принтером - МФУ / телевизор / телефон</label>
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Заправка картриджа" id="printerCard" className="radioInput" /> 
                                                                              <label htmlFor="printerCard">Заправкакартриджа</label>
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="техподдержка по Zoom , Exel , Word" id="PO" className="radioInput" />
                                                                              <label htmlFor="PO">техподдержка по Zoom , Exel , Word </label>
                                                                        </p>
                                                                        <hr />
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="1C - техподдержка " id="1C" className="radioInput" /> 
                                                                              <label htmlFor="1C">1C - техподдержка</label>
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Damumed - логин и пароль / восстановление аккаунта " id="Damumed" className="radioInput" /> 
                                                                              <label htmlFor="Damumed">Damumed - техподдержка</label>
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Порталы МЗРК" id="mzrk" className="radioInput" /> 
                                                                              <label htmlFor="mzrk">МЗРК - техподдержка</label>
                                                                              <br />
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="ЛИС техподдержка" id="lis" className="radioInput" />
                                                                              <label htmlFor="lis">ЛИС - техподдержка</label>
                                                                        </p>
            
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Мис - тех подджерка " id="MIS" className="radioInput" /> 
                                                                              <label htmlFor="MIS">МИС - техподдержка</label>
                                                                              <br/>
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar">
                                                                              <input type="radio" name="report" value="Документолог - техподдержка " id="DOC" className="radioInput" /> 
                                                                              <label htmlFor="DOC">Документолог - техподдержка</label>
                                                                              <br />
                                                                        </p>

                                                                        <hr/>

                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="SimBase техподдержка" id="simbase-t" className="radioInput" />
                                                                              <label htmlFor="simbase-t">SimBase / симбэйс - техподдержка</label>
                                                                        </p>

                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="Просмотр архива записи камер видеонаблюдения" id="camera" className="radioInput" />
                                                                              <label htmlFor="camera">Просмотр архива записи камер видеонаблюдения</label>
                                                                        </p>
            
                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="СКУД - выдать карты / потеря карты" id="skud" className="radioInput" />
                                                                              <label htmlFor="skud">СКУД - выдать карты / потеря карты</label>
                                                                        </p>
                                                                        <p onClick={enterData} className="inputMar"> 
                                                                              <input type="radio" name="report" value="СКУД - поломка" id="skud-p" className="radioInput" />
                                                                              <label htmlFor="skud-p">СКУД - поломка</label>
                                                                        </p>

                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                              <div className="columns__column">
                                    <form className="main__first">
                                          <input className="main__inputs" type="number" placeholder="Введите номер : 777 777 77 77" />
                                    </form>
                                    
                                    <form className="main__first">
                                          <input className="main__inputs" type="text" placeholder="Аты-Жөні / ФИО" />
                                    </form>
                                    
                                    <form className="main__first">
                                          <input className="main__inputs" type="text" placeholder="Бөлімше / Отделение" />
                                    </form>
                                    
                                    <form className="main__first">
                                          <p>Шағымның (оқиғаның) мазмұны <br />
                                          Описание проблемы (инцидента)</p>
                                    
                                          <textarea name="comment" id=""></textarea>
                                    </form>
                                    
                                    <form className="btn">
                                          <button  className="btn__submit">Отправить</button>
                                    </form>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default Columns