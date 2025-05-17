import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TempraturePipe implements PipeTransform{
    transform(value: string | number | null, 
        inputType : 'cel' | 'fah',
        outputType ?: 'cel' | 'fah'
    ){
        
        if(!value){
            return value;
        }

        let val: number;
        if(typeof value === 'string'){
            val = parseFloat(value);
        }else{
            val = value;
        }

        let outputTemp: number;
        let outputSumbol: '°F' | '°C';

        if(inputType === 'cel' && outputType === 'fah'){
            outputTemp = (val)*(9/5) + 32;
            outputSumbol = '°F';
        } else if(inputType === 'fah' && outputType === 'cel'){
            outputTemp = (val-32)*(5/9);
            outputSumbol = '°C';
        }
        else{
            outputTemp = val;
            outputSumbol = outputType === 'cel' ? '°C' : '°F';
        }
        let ans: string = `${outputTemp} ${outputSumbol}`;
        console.log(ans);
        return ans;
    }
}