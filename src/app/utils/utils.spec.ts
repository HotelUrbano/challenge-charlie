import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from '../pages/home/home.component';

describe('Utils', ()=>
{
    beforeEach(()=>{
        TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [HomeComponent]
        });
    });

    it('Valor da temperatura arredondado', inject([HomeComponent], (test: HomeComponent)=>{
		let expectedResult = 36;
        let stringNumber = test.utils.roundWeather(36.000);
        let parseRoundedNumber = parseInt(stringNumber)
        expect(parseRoundedNumber).toEqual(expectedResult)
    }));

    it("Teste setando css da temperatura", inject([HomeComponent], (test: HomeComponent)=>{
		let expectedResult = "warm-temp"
        let result = test.utils.setTempNumberColor(16, "Celcius")
        expect(result).toEqual(expectedResult)
	}));
	
    it("Teste de formatação de hora", inject([HomeComponent], (test: HomeComponent)=>{
		let expectedResult = "12"
		let result = test.utils.formatTime("2021-04-01 12:00:00")
        expect(result).toEqual(expectedResult)
	}));
	
    it("Teste de formatação de hora", inject([HomeComponent], (test: HomeComponent)=>{
		let condition = "snow"
		let expectedResult = "Neve"
		let result = test.utils.translateConditions(condition)
        expect(result).toEqual(expectedResult)
	}));
	
})