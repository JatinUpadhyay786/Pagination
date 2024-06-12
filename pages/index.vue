<template>
  <div class="container">
    <h1 >Pagination Component</h1>
    <div class="searchBar">
      <input type="text" v-model="searchKeyword">
      <button @click="handleSearch()">search</button>
    </div>
    <p v-if="isData()">
      <ol style="list-style: none;">
        <li v-for="(itm) in data" :key="itm.id">{{ itm.title }}</li>
      </ol>
    </p>
    <div class="paginationComponent">
      <span><button class="btn" @click="handlePrev()">Prev</button></span>
      <span class="page" v-for="(itm,idx) in [...Array(totalPages)]" :key="idx" @click="handlePage(idx+1)">
        <button class="btn">{{ idx+1 }}</button>
      </span>
      <span>
        <button class="btn" @click="handleNext()">Next</button>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      visibleData: [],
      page:1,
      searchKeyword:"",
    };
  },
  computed: {
    ...mapState("user", ["data","totalPages","currentPage"]),
  },
  async mounted() {
    await this.fetchData({page:1, searchWord:""});
    this.visibleData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    ...mapActions("user", {
      fetchData: "FETCH_DATA",
    }),
    isData() {
      if (this.data.length > 0) {
        return true;
      }
      return false;
    },
    handleNext(){
      if(this.currentPage === this.totalPages){
        this.fetchData({page:this.currentPage,searchWord:this.searchKeyword.trim()});
      }
      else{
        this.fetchData({page:this.currentPage+1,searchWord:this.searchKeyword.trim()});
      }
    },
    handlePrev(){
      if(this.currentPage === 1){
        this.fetchData({page:this.currentPage,searchWord:this.searchKeyword.trim()});
      }
      else{
        this.fetchData({page:this.currentPage-1,searchWord:this.searchKeyword.trim()});
      }
    },
    handlePage(idx){
      this.fetchData({page:idx,searchWord:this.searchKeyword.trim()});
    },
    handleSearch(){
      console.log("searchWord", this.searchKeyword.trim());
      this.fetchData({page:1, searchWord:this.searchKeyword.trim()});
    }
  },
};
</script>
<style scoped>
.paginationComponent{
  display: flex;
  justify-content: center;
}
.page{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  background-color: #008CBA; 
  border: none;
  color: white;
  padding: 15px 32px; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  font-size: 16px; 
  margin: 4px 2px; 
  cursor: pointer;
  border-radius: 12px; 
}

ol li {
  background-color: #fff;
  margin-bottom: 10px; 
  padding: 15px; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

ol li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.searchBar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
}

.searchBar input {
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 25px;
  width: 250px;
}

.searchBar button {
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 25px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.searchBar button:hover {
  background-color: #005f6b;
}
</style>
