<template>
    <div>
        <el-card  @click="router.push('/admin/news/detail/'+props.news.news_id);" class="main_card">
            <p class="card-up">{{props.news.title}}</p>

            <el-icon>
                <Clock />
            </el-icon> {{props.news.createdAt}}
            <p style="  overflow: hidden; text-overflow: ellipsis;white-space: nowrap;">{{ props.news.content }}
            </p>
            <template #footer>
                <el-icon>
                    <PhoneFilled />
                </el-icon> (+86) 13654896654 &nbsp;
                <el-icon>
                    <Briefcase />
                </el-icon> zhanggaobo@qq.com &nbsp;
                <el-icon>
                    <Platform />
                </el-icon> http://127.0.0.1:5173/notice1
            </template>
        </el-card>

    </div>
</template>


<script setup>
import router from '@/router';
import { defineProps,ref } from 'vue';

const props = defineProps(['news'])


</script>