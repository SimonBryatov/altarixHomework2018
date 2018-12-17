export function withLoader(a) {
    return function(target: any, key: string, descriptor: any) {
      const originalMethod = descriptor.value; 
        
        descriptor.value = async function (...args: any[]) {
        //console.log(target);
        console.log(`Entering ${key} method`);
        let result = await originalMethod.apply(this, args);
        console.log(`Leaving ${key} method` );
  
        return result;
      }
  
      return descriptor;
    }
  }