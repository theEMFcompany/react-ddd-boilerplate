import localforage from 'localforage';

export function persist(key: string, value: any){
  return new Promise((resolve, reject)=>{
    try{
      localforage.setItem(key, value)
      .then(result=>{
        resolve(result)
      })
      .catch(error=>{
        reject(error)
      })
    }catch(error){
      reject(error)
    }
  })
}

export function retrieve(key: string){
  return new Promise((resolve, reject)=>{
    try{
      localforage.getItem(key)
      .then(result=>{
        resolve(result)
      })
      .catch(error=>{
        reject(error)
      })
    }catch(error){
      reject(error)
    }
  })
}
