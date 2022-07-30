<template>
    <div>
        <select :style="inOptions.width !== null ? ('width:'+inOptions.width+' !important;') : ''" :id="inOptions.name" :name="inOptions.name" :ref="inOptions.name" v-model="inValue">
            <option v-if="Object.keys(setAllData).length > 0" :value="inOptions.allValue === null ? '' : inOptions.allValue">{{ inOptions.allText === null ? "전체" : inOptions.allText}}</option>
            <option v-for="(row, index) in setData" :key="index" :value="inOptions.dataValueName === null ? row.value : row[inOptions.dataValueName]">{{ inOptions.dataLabelName === null ? row.label : row[inOptions.dataLabelName]}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "CommonSelectBox",
    props: {
        options : {
            required: true
        },
        value : {
            required: true
        }
    },
    data: () => ({
        inValue : null,
        inOptions: null,
    }),
    created() {
        this.inValue = this.value;
        this.inOptions = this.options;

    },
    computed: {
        setAllData: function() {
            if(this.inOptions.data !== null) {
                console.log(this.inOptions.data[0][this.inOptions.allValue === null ? "value" : this.inOptions.allValue] === "" ? {} : this.inOptions.data[0] );
                return this.inOptions.data[0][this.inOptions.allValue === null ? "value" : this.inOptions.allValue] === "" ? {} : this.inOptions.data[0] ;
            } else {
                return {};
            }
        },
        setData: function() {
            if(this.inOptions.data!== null) {
                if(this.inOptions.data[0][this.inOptions.allValue === null ? "value" : this.inOptions.allValue] === "") {
                    return this.inOptions.data.slice(1, this.inOptions.data.length);
                } else {
                    console.log(this.inOptions.data);
                    return this.inOptions.data;
                }
            } else {
                return {};
            }
        }
    },
};
</script>

<style>

</style>